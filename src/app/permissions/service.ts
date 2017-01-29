import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Permission } from './model';

@Injectable()
export class PermissionService {

	public config: any = { server_ip_addr: "http://localhost:3002"};
	
	private modelUrl = this.config.server_ip_addr+'/api/permissions';
	private id_token = localStorage.getItem('id_token');
	private headers = new Headers({
		'Content-Type': 'application/json',
		'x-access-token': this.id_token
	});

	constructor(private http: Http) {}

	getList(): Promise<Permission[]> {
		console.log('Get the models from: '+this.modelUrl);
		return this.http.get(this.modelUrl, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Permission[])
			.catch(this.handleError)
	}

	get(id: number): Promise<Permission> {
		console.log('Get an Permission from: '+this.modelUrl+'/'+id);
		const url = this.modelUrl+'/'+id;
		return this.http.get(url, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Permission)
			.catch(this.handleError);
	}

	update(model: Permission): Promise<Permission> {
		const url = `${this.modelUrl}/${model.id}`;
		console.log('Update Model at url: '+url);
		return this.http
			.put(url, JSON.stringify(model), {headers: this.headers})
			.toPromise()
			.then( () => model )
			.catch(this.handleError);
	}

	create(model: Permission): Promise<Permission> {
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