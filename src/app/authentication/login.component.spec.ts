import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                               from '@angular/platform-browser';
import { DebugElement }                     from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule }                      from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { RouterModule, Router }             from '@angular/router';

import { LoginComponent }                   from './login.component';
import { AuthService }                      from './auth.service';
import { Logger }                           from '../logger/default-log.service';

let comp: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let de: DebugElement; 
let el: HTMLElement;

describe('Login Component ...',  () => {

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule, 
        HttpModule, 
        CommonModule, 
        RouterModule 
      ],
      providers: [ 
        AuthService, 
        Logger, 
        { provide: Router, 
          useClass: class { navigate = jasmine.createSpy("navigate"); } 
        }
      ],
      declarations: [ 
        LoginComponent 
      ] // declare the test component
    })
    .compileComponents(); // compile template and css files
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance; // LoginComponent test instance

    // query for the title class by CSS element selector
    de = fixture.debugElement.query(By.css('.title'));
    el = de.nativeElement;
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.message);
  });

});
