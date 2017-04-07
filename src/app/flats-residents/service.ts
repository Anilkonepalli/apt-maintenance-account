import { Injectable } 				from '@angular/core';

import { Flat } 							from '../flats/model';
import { FlatService } 				from '../flats/service';

import { Resident } 				  from '../residents/model';
import { ResidentService } 	  from '../residents/service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FlatResidentService {

    constructor(
        private lservice: FlatService,
        private rservice: ResidentService
    ) { }

    getlmodels(): Promise<Flat[]> {
        return this.lservice.getList();
    }

    getrmodels(): Promise<Resident[]> {
        return this.rservice.getList();
    }

    getAttachedModels(id: number): Promise<Resident[]> { // get attached models for the selected item on left side
        return this.lservice.getMyResidents(id);
    }

    saveAttachedModels(lId: number, ids: number[]): Promise<number> {
        return this.lservice.updateMyResidents(lId, ids);
    }
}
