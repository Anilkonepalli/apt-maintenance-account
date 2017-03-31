import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Component }          from '@angular/core';
import { By }                               from '@angular/platform-browser';
import {APP_BASE_HREF}                      from '@angular/common';

import { AppModule }                        from './app.module';
import { AppComponent }                     from './app.component';
import {
    RouterLinkStubDirective,
    RouterOutletStubComponent }               from '../testing';

@Component({ selector: 'app-welcome', template: '' })
class WelcomeStubComponent { }

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', function() {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            declarations: [
                // AppComponent,
                WelcomeStubComponent,
                RouterLinkStubDirective,
                RouterOutletStubComponent
            ],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        });
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
    }));

    tests();  // commented out as it requires further understanding and time
});

//////////////  functions  /////////////
function tests() {

    let links: RouterLinkStubDirective[];
    let linkDes: DebugElement[];

    beforeEach(() => {
        // trigger initial data binding
        fixture.detectChanges();

        // find DebugElements with an attached RouterLinkStubDirective
        linkDes = fixture.debugElement
            .queryAll(By.directive(RouterLinkStubDirective));

        // get the attached link directive instances using the DebugElement injectors
        links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    });

    it('can instantiate it', () => {
        expect(comp).not.toBeNull();
    });

}
