import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Role } from './model';

@Injectable()
export class RoleService {

	public config: any = { server_ip_addr: "http://localhost:3002"};
	
	private modelUrl = this.config.server_ip_addr+'/api/roles';
	private id_token = localStorage.getItem('id_token');
	private headers = new Headers({
		'Content-Type': 'application/json',
		'x-access-token': this.id_token
	});

	constructor(private http: Http) {}

	getList(): Promise<Role[]> {
		console.log('Get the roles from: '+this.modelUrl);
		return this.http.get(this.modelUrl, {headers: this.headers})
			.toPromise()
			.then(model => model.json() as Role[])
			.catch(this.handleError)
	}

	get(id: number): Promise<Role> {
		console.log('Get a role model from: '+this.modelUrl+'/'+id);
		const url = this.modelUrl+'/'+id;
		return this.http.get(url, {headers: this.headers})
			.toPromise()
			.then(model => model.json() as Role)
			.catch(this.handleError);
	}

	update(model: Role): Promise<Role> {
		const url = `${this.modelUrl}/${model.id}`;
		console.log('Update Role model at url: '+url);
		return this.http
			.put(url, JSON.stringify(model), {headers: this.headers})
			.toPromise()
			.then( () => model )
			.catch(this.handleError);
	}

	create(model: Role): Promise<Role> {
		return this.http
			.post(this.modelUrl, JSON.stringify(model), {headers: this.headers})
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	delete(id: number): Promise<void> {
		const url = `${this.modelUrl}/${id}`;
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