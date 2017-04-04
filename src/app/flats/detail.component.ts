import { Component, Input, OnInit } 				from '@angular/core';
import { Response }                         from '@angular/http';
import { FormBuilder, FormGroup }						from '@angular/forms';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }													from '@angular/common';

import { Flat }													    from './model';
import { FlatService }										  from './service';
import { Authorization }										from '../authorization/model';
import { Message, ErrorMessage,
    InfoMessage, WarningMessage }           from '../shared';

import 'rxjs/add/operator/switchMap';

var detail_html = require('./detail.component.html');
var detail_html_string = detail_html.toString();
var detail_css = require('./detail.component.css');
var detail_css_string = detail_css.toString();

@Component({
    selector: 'flat-detail',
    //templateUrl: './detail.component.html',
    template: detail_html_string,
    styles: [detail_css_string],
})
export class FlatDetailComponent implements OnInit {
    @Input() model: Flat;
    editMode: boolean = true;
    modelName: string = 'Flat';
    auth: Authorization;
    hideSave: boolean = true;
    message: Message = new Message();

    constructor(
        private service: FlatService,
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
                    (model: Flat) => {
                        this.model = model;
                        if (model.id) this.editMode = true;
                        else this.editMode = false;
                        let canEdit = this.auth.allowsEdit(model.owner_id) && this.editMode;
                        let canAdd = this.auth.allowsAdd() && !this.editMode;
                        this.hideSave = !(canEdit || canAdd);
                    },
                    (error: any) => {
                        console.log('Error in Flats detail.component >> ngOnInit()...');
                        console.log(error);
                    }
                    );
            })
            .catch((error: any) => {
                console.log('Error in authorization Flats detail.component > ngOnInit()...');
                console.log(error);
            }
            );
    }

    goBack(): void {
        this.location.back();
    }

    gotoList() {
        let modelId = this.model ? this.model.id : null;
        this.router.navigate(['/flats', { id: modelId, foo: 'foo' }]);
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
