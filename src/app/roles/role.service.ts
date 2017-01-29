import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Role } from './role';

@Injectable()
export class RoleService {

	public config: any = { server_ip_addr: "http://localhost:3002"};
	
	private roleUrl = this.config.server_ip_addr+'/api/roles';
	private id_token = localStorage.getItem('id_token');
	private headers = new Headers({
		'Content-Type': 'application/json',
		'x-access-token': this.id_token
	});

	constructor(private http: Http) {}

	getRoles(): Promise<Role[]> {
		console.log('Get the roles from: '+this.roleUrl);
		return this.http.get(this.roleUrl, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Role[])
			.catch(this.handleError)
	}

	getRole(id: number): Promise<Role> {
		console.log('Get an role from: '+this.roleUrl+'/'+id);
		const url = this.roleUrl+'/'+id;
		return this.http.get(url, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Role)
			.catch(this.handleError);
	}

	update(role: Role): Promise<Role> {
		const url = `${this.roleUrl}/${role.id}`;
		console.log('Update role at url: '+url);
		return this.http
			.put(url, JSON.stringify(role), {headers: this.headers})
			.toPromise()
			.then( () => role )
			.catch(this.handleError);
	}

	create(role: Role): Promise<Role> {
		return this.http
			.post(this.roleUrl, JSON.stringify(role), {headers: this.headers})
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	delete(id: number): Promise<void> {
		const url = `${this.roleUrl}/${id}`;
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