import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Account }												from './model';
import { AccountService }									from './service';
import { Authorization }									from '../authorization/model';

import 'rxjs/add/operator/switchMap';

var periodic_css = require('./periodic.component.css');
var periodic_css_string = periodic_css.toString();
var periodic_html = require('./periodic.component.html');
var periodic_html_string = periodic_html.toString();


@Component({
  selector: 'account-periodic',
  styles: [periodic_css_string],
  templateUrl: periodic_html_string
})
export class PeriodicComponent implements OnInit {

  ngOnInit(): void {

  }

}
