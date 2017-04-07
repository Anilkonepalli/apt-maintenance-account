import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';

import { Flat }														from '../flats/model';
import { Resident }											  from '../residents/model';

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
    attachedStream: Observable<Resident[]>;
    detachedStream: Observable<Resident[]>;
    rstream: Observable<Resident[]>; // rstream holds right side models (attached + detached)

    lId: number;          // selected left model
    aIds: Array<number>;  // ids of selected attached models
    dIds: Array<number>;  // ids of selected detached models

    constructor(
        private service: FlatResidentService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        console.log('Inside flats-residents component ngOnInit()...');
        this.lstream = this.route.params
            .switchMap((params: Params) => {
                return this.service.getlmodels();
            });

        this.rstream = this.route.params
            .switchMap((params: Params) => {
                return this.service.getrmodels();
            });

        this.detachedStream = this.rstream; // initially rstream are in detachedStream
    }

    onlSelect(model: Flat): void {
        this.service.getAttachedModels(model.id)
            .then(amodels => {
                this.attachedStream = Observable.of(amodels);
                let attachedaIds = amodels.map(amodel => amodel.id);
                this.updateDetachedModelsExcluding(attachedaIds);
                return null;
            });
    }

    attach() {
        this.detachedStream.subscribe(dmodel => {
            let dIdNums = this.dIds.map(each => +each); // convert string id into integer
            let dmodels = dmodel.filter(each => !dIdNums.includes(each.id));
            this.detachedStream = Observable.of(dmodels);

            let dIdsNew = dmodels.map(dmodel => dmodel.id); // collect aIds of new amodels
            this.updateAttachedModelsExcluding(dIdsNew);
        });
    }

    detach() {
        this.attachedStream.subscribe(amodel => {   // remove the selected items from attached models
            let aIdsNums = this.aIds.map(each => +each); // convert string id into integer
            let amodels = amodel.filter(each => !aIdsNums.includes(each.id)); // filter out selected amodels
            this.attachedStream = Observable.of(amodels); // update attached stream after filtering

            let aIdsNew = amodels.map(amodel => amodel.id); // collect aIds of new amodels
            this.updateDetachedModelsExcluding(aIdsNew); // now, dmodels = rmodels - amodels
        });
    }

    save() {
        this.attachedStream.subscribe(amodel => {
            let aIds = amodel.map(each => each.id);
            this.service.saveAttachedModels(this.lId, aIds);
        })
    }

    private updateDetachedModelsExcluding(attachedaIds: number[]) {
        this.rstream.subscribe(rmodel => {
            let availablerModels = rmodel.filter(each => !attachedaIds.includes(each.id));
            this.detachedStream = Observable.of(availablerModels);
        });
    }

    private updateAttachedModelsExcluding(attacheddIds: number[]) {
        this.rstream.subscribe(rmodel => {
            let availablerModels = rmodel.filter(each => !attacheddIds.includes(each.id));
            this.attachedStream = Observable.of(availablerModels);
        });
    }

}
