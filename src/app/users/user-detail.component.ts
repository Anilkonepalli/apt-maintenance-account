import { Component, Input, OnInit } 		from '@angular/core';
import { Router, ActivatedRoute, Params } 	from '@angular/router';
import { Location }							from '@angular/common';

import { User }							from '../models/user';
import { UserService }					from './user.service';

import 'rxjs/add/operator/switchMap';

var detail_html = require('./user-detail.component.html');
var detail_html_string = detail_html.toString();
var detail_css = require('./user-detail.component.css');
var detail_css_string = detail_css.toString();

@Component({
	selector: 'user-detail',
	templateUrl: detail_html_string,
	styles: [ detail_css_string ],
})
export class UserDetailComponent implements OnInit {
	@Input() user: User;
	editMode: boolean = true;

	constructor(
		private service: UserService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		console.log(" UserDetailComponent >> ngOnInit() ....");
		this.route.params
			.switchMap((params: Params) => this.service.getUser(+params['id']))
			.subscribe((user: User) => {
				this.user = user;
				if(user.id) this.editMode = true; 
				else this.editMode = false;
			});
	}

	goBack(): void {
		this.location.back();
	}

	gotoUsers() {
		let userId = this.user ? this.user.id : null;
		this.router.navigate(['/users', { id: userId, foo: 'foo'}]);
	}

	save(): void {
		this.editMode ? this.update() : this.add();
	}

	private add(): void {
		this.service.create(this.user)
			.then( (acct) => { 
				this.user = acct; this.gotoUsers(); 
			});		
	}

	private update(): void {
		this.service.update(this.user)
			.then( () => this.goBack() );

	}
}