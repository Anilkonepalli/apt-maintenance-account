import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                               from '@angular/platform-browser';
import { DebugElement }                     from '@angular/core';

import { AccountDetailComponent }           from './detail.component';

describe('Account Detail Component ...', function () {

  let comp: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;
  let de: DebugElement; 
  let el: HTMLElement;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailComponent ] // declare the test component
    })
    .compileComponents(); // compile template and css files
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailComponent);
    comp = fixture.componentInstance; // AccountDetailComponent test instance

    // query for the title class by CSS element selector
    de = fixture.debugElement.query(By.css('.title'));
    el = de.nativeElement;
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.modelName);
  });

});
