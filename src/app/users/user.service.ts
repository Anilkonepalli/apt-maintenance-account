import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';

@Injectable()
export class UserService {

	public config: any = { server_ip_addr: "http://localhost:3002"};
	
	private userUrl = this.config.server_ip_addr+'/api/users';
	private headers = new Headers( {'Content-Type': 'application/json'} );

	constructor(private http: Http) {}

	getUsers(): Promise<User[]> {
		console.log('Get the users from: '+this.userUrl);
		return this.http.get(this.userUrl)
			.toPromise()
			.then(response => response.json() as User[])
			.catch(this.handleError)
	}

	getUser(id: number): Promise<User> {
		console.log('Get an user from: '+this.userUrl+'/'+id);
		const url = this.userUrl+'/'+id;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as User)
			.catch(this.handleError);
	}

	update(user: User): Promise<User> {
		const url = `${this.userUrl}/${user.id}`;
		console.log('Update user at url: '+url);
		return this.http
			.put(url, JSON.stringify(user), {headers: this.headers})
			.toPromise()
			.then( () => user )
			.catch(this.handleError);
	}

	create(user: User): Promise<User> {
		return this.http
			.post(this.userUrl, JSON.stringify(user), {headers: this.headers})
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	delete(id: number): Promise<void> {
		const url = `${this.userUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
			.toPromise()
			.then( () => null )
			.catch(this.handleError);
	}
	
	private handleError(error: any) {
		console.log('An error occured in Maint Acct Service...');
		console.log(error);
		return Promise.reject(error.message || error);
	}

}