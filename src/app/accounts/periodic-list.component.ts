import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Account }												from './model';
import { AccountService }									from './service';
import { Authorization }									from '../authorization/model';

import 'rxjs/add/operator/switchMap';

var periodic_list_css = require('./periodic-list.component.css');
var periodic_list_css_string = periodic_list_css.toString();
var periodic_list_html = require('./periodic-list.component.html');
var periodic_list_html_string = periodic_list_html.toString();


@Component({
  selector: 'account-periodic-list',
  styles: [periodic_list_css_string],
  templateUrl: periodic_list_html_string
})
export class PeriodicListComponent implements OnInit {

  ngOnInit(): void {

  }

}
