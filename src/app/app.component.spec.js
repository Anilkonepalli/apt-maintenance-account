"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var app_module_1 = require("./app.module");
var app_component_1 = require("./app.component");
var testing_2 = require("../testing");
var WelcomeStubComponent = (function () {
    function WelcomeStubComponent() {
    }
    return WelcomeStubComponent;
}());
WelcomeStubComponent = __decorate([
    core_1.Component({ selector: 'app-welcome', template: '' })
], WelcomeStubComponent);
var comp;
var fixture;
describe('AppComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [app_module_1.AppModule],
            declarations: [
                // AppComponent,
                WelcomeStubComponent,
                testing_2.RouterLinkStubDirective,
                testing_2.RouterOutletStubComponent
            ],
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }]
        });
        /*    .compileComponents()  // not required in Webpack
            .then( () => {
              fixture = TestBed.createComponent(AppComponent);
              comp = fixture.componentInstance;
            }); */
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        comp = fixture.componentInstance;
    }));
    tests();
});
//////////////  functions  /////////////
function tests() {
    var links;
    var linkDes;
    beforeEach(function () {
        // trigger initial data binding
        fixture.detectChanges();
        // find DebugElements with an attached RouterLinkStubDirective
        linkDes = fixture.debugElement
            .queryAll(platform_browser_1.By.directive(testing_2.RouterLinkStubDirective));
        // get the attached link directive instances using the DebugElement injectors
        links = linkDes.map(function (de) { return de.injector.get(testing_2.RouterLinkStubDirective); });
    });
    it('can instantiate it', function () {
        expect(comp).not.toBeNull();
    });
    it('can get RouterLinks from template', function () {
        expect(links.length).toBe(3, 'should have 3 links');
        expect(links[0].linkParams).toBe('/dashboard', '1st link should go to Dashboard');
        expect(links[1].linkParams).toBe('/heroes', '2nd link should go to Heroes');
    });
    it('can click Heroes link in template', function () {
        var heroesLinkDe = linkDes[1];
        var heroesLink = links[1];
        expect(heroesLink.navigatedTo).toBeNull('link should not have navigated yet');
        heroesLinkDe.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(heroesLink.navigatedTo).toBe('/heroes');
    });
}
//# sourceMappingURL=app.component.spec.js.map