import { Component } 	from '@angular/core';
import { Router } 		from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent  { 
	title = 'XYZ Apartments'; 
	jwt: string = ''; // initialize with an empty string

	constructor(public router: Router) {
		this.jwt = localStorage.getItem('id_token');
	}

	logout() {
		localStorage.removeItem('id_token');
		this.jwt = '';
		this.router.navigate(['/login']);
	}

}
