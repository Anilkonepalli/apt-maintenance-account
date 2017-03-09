"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/http/testing");
var http_1 = require("@angular/http");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var service_1 = require("../users/service");
var service_2 = require("./service");
var data = require('../../testing/db.json');
var makeAccoutData = data.maintenance_accounts;
/////////////////////  Tests //////////////////////
describe('Account Service (mockBackend)', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                service_2.AccountService,
                service_1.UserService,
                { provide: http_1.XHRBackend, useClass: testing_2.MockBackend }
            ]
        });
    }));
    it('can instantiate service when inject service', testing_1.inject([service_2.AccountService], function (service) {
        expect(service instanceof service_2.AccountService).toBe(true);
    }));
    it('can instantiate service with "new"', testing_1.inject([http_1.Http, service_1.UserService], function (http, us) {
        expect(http).not.toBeNull('http should be provided');
        expect(us).not.toBeNull('UserService should be provided');
        var service = new service_2.AccountService(http, us);
        expect(service instanceof service_2.AccountService).toBe(true, 'new service should be ok');
    }));
});
//# sourceMappingURL=service.spec.js.map