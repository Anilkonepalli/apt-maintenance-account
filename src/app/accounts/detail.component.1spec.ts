import { async, ComponentFixture, TestBed,
    fakeAsync, inject, tick }                   from '@angular/core/testing';
import { By }                                   from '@angular/platform-browser';
import { DebugElement }                         from '@angular/core';
import { Location }													    from '@angular/common';

import { ActivatedRoute, ActivatedRouteStub,
    click, newEvent, Router, RouterStub }       from '../../testing';

import { AccountsModule }                       from './module';
import { SharedModule }                         from '../shared/shared.module';

import { Account }                              from './model';
import { AccountDetailComponent }               from './detail.component';
import { AccountService }                       from './service';

/////////// Testing Vars //////////
let activatedRoute: ActivatedRouteStub;
let comp: AccountDetailComponent;
let fixture: ComponentFixture<AccountDetailComponent>;
let page: Page;

/////////////// Tests
describe('AccountDetailComponent', () => {
    beforeEach(() => {
        activatedRoute = new ActivatedRouteStub();
    });
    describe('with AccountModule setup', accountModuleSetup);
});

//////////////
import { ACCOUNTS, FakeAccountService } from './testing';

const firstAccount = ACCOUNTS[0];

function accountModuleSetup() {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AccountsModule],
            providers: [
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useValue: activatedRoute },
                { provide: AccountService, useClass: FakeAccountService }
            ]
        });
    }));

    describe('when navigate to existing account', () => {
        let expectedAccount: Account;

        beforeEach(async(() => {
            expectedAccount = firstAccount;
            activatedRoute.testParams = { id: expectedAccount.id };
            createComponent();
        }));

        it('should display that account\'s name', () => {
            expect(page.nameDisplay.textContent).toBe(expectedAccount.name);
        });
    });
}


//////////////////  Helpers  ////////////////
/** Create the HeroDetailComponent, initialize it, set test variables */
function createComponent() {
    fixture = TestBed.createComponent(AccountDetailComponent);
    comp = fixture.componentInstance;
    page = new Page();

    // 1st change detection triggers ngOnInit which gets an account
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        // 2nd change detection displays the async-fetched account
        fixture.detectChanges();
        page.addPageElements();
    });
}

class Page {
    gotoSpy: jasmine.Spy;
    navSpy: jasmine.Spy;

    saveBtn: DebugElement;
    cancelBtn: DebugElement;
    nameDisplay: HTMLElement;
    nameInput: HTMLInputElement;

    constructor() {
        const router = TestBed.get(Router); // get router from root injector
        this.gotoSpy = spyOn(comp, 'gotoList').and.callThrough();
        this.navSpy = spyOn(router, 'navigate');
    }

    /** Add page elements after account arrives */
    addPageElements() {
        if (comp.model) {
            // have an account so these elements are now in the DOM
            const buttons = fixture.debugElement.queryAll(By.css('button'));
            this.saveBtn = buttons[1];
            this.cancelBtn = buttons[0];
            this.nameDisplay = fixture.debugElement.query(By.css('.title')).nativeElement;
            this.nameInput = fixture.debugElement.query(By.css('input')).nativeElement;
        }
    }
}
