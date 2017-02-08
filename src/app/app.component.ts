import { Component } 	from '@angular/core';
import { Router } 		from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent  { 
	title = 'XYZ Apartments'; 
	jwt: string = ''; // initialize with an empty string
	user: any;

	constructor(public router: Router) {
		this.jwt = localStorage.getItem('id_token');
		this.user = localStorage.getItem('user');
	}

	logout() {
		localStorage.removeItem('id_token');
		localStorage.removeItem('user');
		this.jwt = '';
		this.user = '';
		this.router.navigate(['/login']);
	}

}
