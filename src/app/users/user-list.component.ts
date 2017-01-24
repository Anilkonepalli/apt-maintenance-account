import { Component, OnInit }				from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable }						from 'rxjs/Observable';

import { User }							from '../models/user';
import { UserService }					from './user.service';

var list_css = require('./user-list.component.css');
var list_css_string = list_css.toString();
var list_html = require('./user-list.component.html');
var list_html_string = list_html.toString();


@Component({
	selector: 'user-list',
	styles: [ list_css_string ],
	templateUrl: list_html_string
})
export class UserListComponent implements OnInit {

	users: Observable<User[]>;

	private selectedId: number;

	addingAccount: boolean = false;
	error: any;
	
	constructor(
		private service: UserService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
console.log("UserListComponent >> ngOnInit()");
		this.users = this.route.params
			.switchMap((params: Params) => {
				this.selectedId = +params['id'];
				console.log("calling service to getUsers()...");
				return this.service.getUsers();
			});

	}

	onSelect(user: User): void {
		this.router.navigate(['/users', user.id]);
	}

	isSelected(user: User) {
		return user ? user.id === this.selectedId : false;
	}

	add(): void {
		console.log('adding an user...');
		console.log(this.users);
		this.router.navigate(['/users', 0]); // 0 represent new user
	}

	delete(user: User): void {
		this.service
			.delete(user.id)
			.then( () => { // filter out the deleted user from users
				this.users = this.users.filter( (acct, i) => {
					return acct[i] !== user; 
				});
			});
	}
}