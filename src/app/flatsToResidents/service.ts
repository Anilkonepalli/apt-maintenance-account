import { Injectable } 				from '@angular/core';

import { Flat, FlatService }  from '../flats';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FlatResidentService {

    constructor(
        private lservice: FlatService
    ) { }

    getlmodels(): Promise<Flat[]> {
        return this.lservice.getList();
    }
}
