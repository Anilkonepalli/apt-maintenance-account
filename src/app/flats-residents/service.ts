import { Injectable } 				    from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Flat } 							    from '../flats/model';
import { Resident } 				      from '../residents/model';
import { Authorization } 	        from '../authorization/model';

import { MODULE }                 from '../shared/constants';

import { FlatService } 				    from '../flats/service';
import { ResidentService } 	      from '../residents/service';
import { AuthorizationService }   from '../authorization/service';

@Injectable()
export class FlatResidentService {

  constructor(
    private lservice: FlatService,
    private rservice: ResidentService,
    private authzn: AuthorizationService
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

  getAuthzn(): Authorization {
    return this.authzn.get(MODULE.FLAT_RESIDENT.name);
  }

  /*
    getAuthorization(): Promise<Authorization> {
      return this.lservice.getAuthorizationFor('flats-residents');
    }
  */

}
