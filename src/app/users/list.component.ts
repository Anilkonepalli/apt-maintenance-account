import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { User }														from './model';
import { UserService }										from './service';

import 'rxjs/add/operator/switchMap';

var list_css = require('./list.component.css');
var list_css_string = list_css.toString();
var list_html = require('./list.component.html');
var list_html_string = list_html.toString();


@Component({
    selector: 'user-list',
    styles: [list_css_string],
    templateUrl: list_html_string
})
export class UserListComponent implements OnInit {

    models: Observable<User[]>;

    private selectedId: number;

    constructor(
        private service: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.models = this.route.params
            .switchMap((params: Params) => {
                this.selectedId = +params['id'];
                return this.service.getList();
            });
    }

    onSelect(model: User): void {
        this.router.navigate(['/users', model.id]);
    }

    isSelected(model: User) {
        return model ? model.id === this.selectedId : false;
    }

    add(): void {
        this.router.navigate(['/users', 0]); // 0 represent new user
    }

    delete(model: User): void {
        this.service
            .delete(model.id)
            .then(() => { // filter out the deleted model from models
                this.models = this.models.filter((models, i) => {
                    return models[i] !== model;
                });
            });
    }

}
