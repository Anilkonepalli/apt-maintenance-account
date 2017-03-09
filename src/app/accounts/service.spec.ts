import { async, inject, TestBed }                 from '@angular/core/testing';
import { MockBackend, MockConnection }            from '@angular/http/testing';
import { HttpModule, Http, XHRBackend,
         Response, ResponseOptions }              from '@angular/http';
import { Observable }                             from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { UserService } 		                        from '../users/service';
import { AccountService }                         from './service';
import { Account }                                from './model';

var data = require('../../testing/db.json');
const makeAccoutData = data.maintenance_accounts as Account[];

/////////////////////  Tests //////////////////////
describe('Account Service (mockBackend)', () => {
  beforeEach( async( () => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        AccountService,
        UserService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  }));

  it('can instantiate service when inject service',
    inject([AccountService], (service: AccountService) => {
      expect(service instanceof AccountService).toBe(true);
    }));

  it('can instantiate service with "new"', inject([Http, UserService ], (http: Http, us: UserService) => {
    expect(http).not.toBeNull('http should be provided');
    expect(us).not.toBeNull('UserService should be provided');
    let service = new AccountService(http, us);
    expect(service instanceof AccountService).toBe(true, 'new service should be ok');
  }));

});
