import { Component, Input, OnInit } 				from '@angular/core';
import { Response }                         from '@angular/http';
import { FormBuilder, FormGroup }						from '@angular/forms';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';

import { Resident }											    from './model';
import { ResidentService }								  from './service';
import { Authorization }										from '../authorization/model';
import { Message, ErrorMessage,
    InfoMessage, WarningMessage }           from '../shared';

import 'rxjs/add/operator/switchMap';

var detail_html = require('./detail.component.html');
var detail_html_string = detail_html.toString();
var detail_css = require('./detail.component.css');
var detail_css_string = detail_css.toString();

@Component({
    selector: 'resident-detail',
    template: detail_html_string,
    styles: [detail_css_string],
})
export class ResidentDetailComponent implements OnInit {
    @Input() model: Resident;
    editMode: boolean = true;
    modelName: string = 'Resident';
    auth: Authorization;
    hideSave: boolean = true;
    message: Message = new Message();
    types: string[] = [
        'owner',
        'tenant',
        'relative',
        'friend',
        'guest'
    ];
    constructor(
        private service: ResidentService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.service.getAuthorization()
            .then(auth => {
                this.auth = auth;
                this.route.params
                    .switchMap((params: Params) => this.service.get(+params['id']))
                    .subscribe(
                    (model: Resident) => {
                        this.model = model;
                        if (model.id) this.editMode = true;
                        else this.editMode = false;
                        let canEdit = this.auth.allowsEdit(model.owner_id) && this.editMode;
                        let canAdd = this.auth.allowsAdd() && !this.editMode;
                        this.hideSave = !(canEdit || canAdd);
                    },
                    (error: any) => {
                        console.log('Error in Residents detail.component >> ngOnInit()...');
                        console.log(error);
                    }
                    );
            })
            .catch((error: any) => {
                console.log('Error in authorization Residents detail.component > ngOnInit()...');
                console.log(error);
            }
            );
    }

    goBack(): void {
        this.location.back();
    }

    gotoList() {
        let modelId = this.model ? this.model.id : null;
        this.router.navigate(['/residents', { id: modelId, foo: 'foo' }]);
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
            .then(() => this.goBack())
            .catch((error: any) => {
                let msg = this.handleError(error);
                this.message = new ErrorMessage("Failure", msg);
            });
    }

    private handleError(error: any) {
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = `${error.status} - ${error.statusText || ''}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return errMsg;
    }

}
