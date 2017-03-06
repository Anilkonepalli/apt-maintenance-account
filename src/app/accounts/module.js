"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var list_component_1 = require("./list.component");
var detail_component_1 = require("./detail.component");
var service_1 = require("./service");
var routing_module_1 = require("./routing.module");
var service_2 = require("../users/service");
var AccountsModule = (function () {
    function AccountsModule() {
    }
    return AccountsModule;
}());
AccountsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            routing_module_1.AccountsRoutingModule
        ],
        declarations: [
            list_component_1.AccountListComponent,
            detail_component_1.AccountDetailComponent
        ],
        providers: [
            service_1.AccountService,
            service_2.UserService,
            router_1.ActivatedRoute,
            router_1.Router
        ]
    })
], AccountsModule);
exports.AccountsModule = AccountsModule;
//# sourceMappingURL=module.js.map