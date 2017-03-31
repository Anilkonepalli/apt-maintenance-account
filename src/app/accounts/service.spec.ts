import { async, inject, TestBed }                 from '@angular/core/testing';
import { MockBackend, MockConnection }            from '@angular/http/testing';
import { HttpModule, Http, XHRBackend,
    Response, ResponseOptions }                   from '@angular/http';
import { Observable }                             from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { UserService } 		                        from '../users/service';
import { AccountService }                         from './service';
import { Account }                                from './model';

const makeAccountData = () => [
    { id: 1, name: 'Windstorm' },
    { id: 2, name: 'Bombasto' },
    { id: 3, name: 'Magneta' },
    { id: 4, name: 'Tornado' }
] as Account[];


/////////////////////  Tests //////////////////////
describe('Account Service (mockBackend)', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
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

    it('can instantiate service with "new"', inject([Http, UserService], (http: Http, us: UserService) => {
        expect(http).not.toBeNull('http should be provided');
        expect(us).not.toBeNull('UserService should be provided');
        let service = new AccountService(http, us);
        expect(service instanceof AccountService).toBe(true, 'new service should be ok');
    }));

    it('can provide the mockBackend as XHRBackend',
        inject([XHRBackend], (backend: MockBackend) => {
            expect(backend).not.toBeNull('backend should be provider');
        }));

    describe('when getAccounts', () => {
        let backend: MockBackend;
        let service: AccountService;
        let fakeAccounts: Account[];
        let response: Response;

        beforeEach(inject([Http, XHRBackend, UserService], (http: Http, mbe: MockBackend, us: UserService) => {
            backend = mbe;
            service = new AccountService(http, us);
            fakeAccounts = makeAccountData();
            let options = new ResponseOptions({ status: 200, body: { data: fakeAccounts } });
            response = new Response(options);
        }));

        it('should have expected fake accounts (then) 999', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
            // console.log('Response set as: ...'); console.log(response);
            service.getList999().toPromise()
                .then((accounts: Account[]) => {
                    // console.log('Accounts are: ');console.log(accounts);
                    expect(accounts.length).toBe(4, 'should have expected no. of accounts');
                });
        })));

        it('should have expected fake accounts (Observable.do)', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
            service.getList999()
                .do(accounts => {
                    expect(accounts.length).toBe(fakeAccounts.length, 'should have expected no. of accounts');
                })
                .toPromise();
        })));

        it('should be OK returning no accounts', async(inject([], () => {
            let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
            service.getList999()
                .do(accounts => {
                    expect(accounts.length).toBe(0, 'should have no accounts');
                })
                .toPromise();
        })));

        it('should treat 404 as an Observable error', async(inject([], () => {
            let resp = new Response(new ResponseOptions({ status: 404 }));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

            service.getList999()
                .do(accounts => {
                    fail('should not respond with accounts');
                })
                .catch(err => {
                    expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                    return Observable.of(null); // failure is the expected test result
                })
                .toPromise();
        })));

    });

});
