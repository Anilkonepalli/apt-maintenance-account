import { Injectable } 		from '@angular/core';
import { Http, Headers } 	from '@angular/http';

import { Permission } 		from './model';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class PermissionService {

	//public config: any = { server_ip_addr: "http://localhost:3002"};
	
	//private modelUrl = this.config.server_ip_addr+'/api/permissions';
	private modelUrl = process.env.API_URL + '/api/permissions';
	private id_token = localStorage.getItem('id_token');
	private headers = new Headers({
		'Content-Type': 'application/json',
		'x-access-token': this.id_token
	});

	constructor(private http: Http) {}

	getList(): Promise<Permission[]> {
		return this.http
			.get(this.modelUrl, {headers: this.headers})
			.toPromise()
			.then(models => models.json() as Permission[])
			.catch(this.handleError)
	}

	get(id: number): Promise<Permission> {
		const url = this.modelUrl+'/'+id;
		return this.http
			.get(url, {headers: this.headers})
			.toPromise()
			.then(model => model.json() as Permission)
			.catch(this.handleError);
	}

	update(model: Permission): Promise<Permission> {
		const url = `${this.modelUrl}/${model.id}`;
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
			.then(model => model.json().data)
			.catch(this.handleError);
	}

	delete(id: number): Promise<void> {
		const url = `${this.modelUrl}/${id}`;
		return this.http
			.delete(url, {headers: this.headers})
			.toPromise()
			.then( () => null )
			.catch(this.handleError);
	}
	
	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

}