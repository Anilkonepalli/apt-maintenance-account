"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var model_1 = require("./model");
var service_1 = require("./service");
require("rxjs/add/operator/switchMap");
var detail_html = require('./detail.component.html');
var detail_html_string = detail_html.toString();
var detail_css = require('./detail.component.css');
var detail_css_string = detail_css.toString();
var AccountDetailComponent = (function () {
    function AccountDetailComponent(service, route, router, location) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.location = location;
        this.editMode = true;
        this.modelName = 'Account';
    }
    AccountDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getAuthorization()
            .then(function (auth) {
            _this.auth = auth;
            _this.route.params
                .switchMap(function (params) { return _this.service.get(+params['id']); })
                .subscribe(function (model) {
                _this.model = model;
                if (model.id)
                    _this.editMode = true;
                else
                    _this.editMode = false;
            });
        });
    };
    AccountDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    AccountDetailComponent.prototype.gotoList = function () {
        var modelId = this.model ? this.model.id : null;
        this.router.navigate(['/accounts', { id: modelId, foo: 'foo' }]);
    };
    AccountDetailComponent.prototype.save = function () {
        this.editMode ? this.update() : this.add();
    };
    AccountDetailComponent.prototype.add = function () {
        var _this = this;
        this.service.create(this.model)
            .then(function (model) {
            _this.model = model;
            _this.gotoList();
        });
    };
    AccountDetailComponent.prototype.update = function () {
        var _this = this;
        this.service.update(this.model)
            .then(function () { return _this.goBack(); });
    };
    return AccountDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", model_1.Account)
], AccountDetailComponent.prototype, "model", void 0);
AccountDetailComponent = __decorate([
    core_1.Component({
        selector: 'account-detail',
        //templateUrl: './detail.component.html',
        template: detail_html_string,
        styles: [detail_css_string],
    }),
    __metadata("design:paramtypes", [service_1.AccountService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location])
], AccountDetailComponent);
exports.AccountDetailComponent = AccountDetailComponent;
//# sourceMappingURL=detail.component.js.map