import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Account } from './account';

@Injectable()
export class AccountService {

	public config: any = { server_ip_addr: "http://localhost:3002"};
	
	private accountUrl = this.config.server_ip_addr+'/api/maintenance-accounts';
	private headers = new Headers( {'Content-Type': 'application/json'} );

	constructor(private http: Http) {}

	getAccounts(): Promise<Account[]> {
		console.log('Get the accounts from: '+this.url());
		return this.http.get(this.url())
			.toPromise()
			.then(response => response.json() as Account[])
			.catch(this.handleError)
	}

	getAccount(id: number): Promise<Account> {
		console.log('Get an account from: '+this.url()+'/'+id);
		const url = this.url()+'/'+id;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Account)
			.catch(this.handleError);
	}

	update(account: Account): Promise<Account> {
		const url = `${this.accountUrl}/${account.id}`;
		console.log('Update account at url: '+url);
		return this.http
			.put(url, JSON.stringify(account), {headers: this.headers})
			.toPromise()
			.then( () => account )
			.catch(this.handleError);
	}

	create(account: Account): Promise<Account> {
		return this.http
			.post(this.accountUrl, JSON.stringify(account), {headers: this.headers})
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	private handleError(error: any) {
		console.log('An error occured in Maint Acct Service...');
		console.log(error);
		return Promise.reject(error.message || error);
	}

	private apiUrl() {
		return this.config.server_ip_addr+'/api';
	}

	private url() {
		return this.apiUrl()+'/maintenance-accounts';
	}
}