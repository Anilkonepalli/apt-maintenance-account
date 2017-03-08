"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/http/testing");
var http_1 = require("@angular/http");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/toPromise");
var service_1 = require("./service");
var data = require('./db.json');
var makeAccoutData = data.maintenance_accounts;
/////////////////////  Tests //////////////////////
describe('Account Service (mockBackend)', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                service_1.AccountService,
                { provide: http_1.XHRBackend, useClass: testing_2.MockBackend }
            ]
        });
    }));
    it('can instantiate service when inject service', testing_1.inject([service_1.AccountService], function (service) {
        expect(service instanceof service_1.AccountService).toBe(true);
    }));
});
//# sourceMappingURL=service.spec.js.map