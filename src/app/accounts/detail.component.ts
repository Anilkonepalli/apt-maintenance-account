import { Component, Input, OnInit } 				from '@angular/core';
import { FormBuilder, FormGroup }						from '@angular/forms';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';

import { Account }													from './model';
import { AccountService }										from './service';
import { Authorization }										from '../authorization/model';
import { Flat }                             from '../flats/model';
import { Resident }                         from '../residents/model';

import 'rxjs/add/operator/switchMap';

var detail_html = require('./detail.component.html');
var detail_html_string = detail_html.toString();
var detail_css = require('./detail.component.css');
var detail_css_string = detail_css.toString();

@Component({
    selector: 'account-detail',
    //templateUrl: './detail.component.html',
    template: detail_html_string,
    styles: [detail_css_string],
})
export class AccountDetailComponent implements OnInit {
    @Input() model: Account;
    editMode: boolean = true;
    modelName: string = 'Account';
    auth: Authorization;
    hideSave: boolean = true;
    // flatNumbers: string[] = ['G1', 'G2', 'F1', 'F2'];
    flats: Flat[];
    months: any[] = [
        { number: 1, shortName: 'Jan', longName: 'January' },
        { number: 2, shortName: 'Feb', longName: 'February' }
    ]
    /*    residents: any[] = [
            { name: 'mohan' },
            { name: 'kumar' },
            { name: 'anna' }
        ]; */
    residents: Resident[];

    constructor(
        private service: AccountService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) { }

    ngOnInit(): void {
        console.log('initializing accounts detail component...');
        console.log('get authorization...');
        this.service.getAuthorization()
            .then(auth => {
                this.auth = auth;
                this.route.params
                    .switchMap((params: Params) => this.service.get(+params['id']))
                    .subscribe((model: Account) => {
                        this.model = model;
                        if (model.id) this.editMode = true;
                        else this.editMode = false;
                        let canEdit = this.auth.allowsEdit(model.owner_id) && this.editMode;
                        let canAdd = this.auth.allowsAdd() && !this.editMode;
                        this.hideSave = !(canEdit || canAdd);
                    });
            })
            .catch(err => {
                console.log('Error in Accounts detail components > ngOnInit');
            });
        console.log('getFlatList...');
        this.service.getFlatList()
            .then(flats => {
                console.log('Flat list: '); console.log(flats);
                this.flats = flats;
            })
            .catch(err => {
                console.log('error in fetching flats inside Account Detail Component');
            });

        console.log('getResidentList...');
        this.service.getResidentList()
            .then(residents => {
                console.log('Resident List: '); console.log(residents);
                this.residents = residents;
            })
            .catch(err => {
                console.log('error in retrieving residents in Account Detail Component');
            });
    }

    goBack(): void {
        this.location.back();
    }

    gotoList() {
        let modelId = this.model ? this.model.id : null;
        this.router.navigate(['/accounts', { id: modelId, foo: 'foo' }]);
    }

    save(): void {
        this.editMode ? this.update() : this.add();
    }

    private add(): void {
        this.service.create(this.model)
            .then((model) => {
                this.model = model;
                this.gotoList();
            });
    }

    private update(): void {
        this.service.update(this.model)
            .then(() => this.goBack());
    }

    onFlatNumberChange(event: any) {
        //console.log('detail component >> onFlatNumberChange'); console.log(event);
        let flat = this.flats.find(flat => flat.flat_number === event);
        //console.log('Flat object id: '); console.log(flat.id);
        this.service.getFlatResidents(flat.id)
            .then(flatResidents => {
                //console.log('FlatResidents are: '); console.log(flatResidents);
                this.residents = flatResidents;
            })
            .catch(err => {
                console.log('error in retrieving flatResidents in Account Detail Component');
            });
    }
}
