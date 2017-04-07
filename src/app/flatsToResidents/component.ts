import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Flat }                           from '../flats';

import { FlatResidentService }					  from './service';

import 'rxjs/add/operator/switchMap';

var list_css = require('./component.css');
var list_css_string = list_css.toString();
var list_html = require('./component.html');
var list_html_string = list_html.toString();

@Component({
    selector: 'flat-resident',
    styles: [list_css_string],
    templateUrl: list_html_string
})
export class FlatResidentComponent implements OnInit {

    //----------------------------------------------------------------------------------
    //   Flats (lstream)   |       Residents (rstream = attached + detached)           |
    //                     |   AttachedStream   |  DetachedStream (or Available List)) |
    //----------------------------------------------------------------------------------

    lstream: Observable<Flat[]>;  // stream on left side models

    lid: number;    // selected left model

    constructor(
        private service: FlatResidentService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        console.log('Inside flatsToResidents component ngOnInit()...');
        this.lstream = this.route.params
            .switchMap((params: Params) => {
                return this.service.getlmodels();
            });
    }
}
