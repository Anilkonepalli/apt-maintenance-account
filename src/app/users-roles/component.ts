import { Component, OnInit }							from '@angular/core';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Observable }											from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import * as _                             from 'lodash';

import { Role }														from '../roles/model';
import { User }														from '../users/model';
import { Authorization }									from '../authorization/model';

import { UserRoleService }								from './service';
import { Logger }                         from '../logger/default-log.service';

@Component({
  selector: 'user-role',
  templateUrl: './component.html',
  styleUrls: ['./component.css']
})
export class UserRoleComponent implements OnInit {
  //----------------------------------------------------------------------------------
  //   Users (lstream)   |       Roles (rstream = attached + detached)               |
  //                     |   AttachedStream   |  DetachedStream (or Available List)) |
  //----------------------------------------------------------------------------------

  lstream: Observable<User[]> = Observable.of([]);  // stream on left side models
  attachedStream: Observable<Role[]> = Observable.of([]);
  detachedStream: Observable<Role[]> = Observable.of([]);
  rstream: Observable<Role[]>; // rstream holds right side models (attached + detached)

  lId: number;       // selected left model
  aIds: Array<number>;  // ids of selected attached models
  dIds: Array<number>;  // ids of selected detached models
  canDetach: boolean = false;
  canAttach: boolean = false;
  authzn: Authorization;
  editAllowed: boolean = false;

  constructor(
    private service: UserRoleService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger
  ) { }

  ngOnInit(): void {
    this.logger.info('Inside users-roles component ngOnInit()...');
    this.authzn = this.service.getAuthzn();
    this.logger.info('Inside users-roles component...'); this.logger.info(this.authzn);
    if (this.authzn.permissions.length < 1) return; // just return if permission list is empty
    this.editAllowed = this.authzn.allowsEdit();
    this.initStreams();
  }

  initStreams() {
    this.lstream = this.route.params
      .switchMap((params: Params) => {
        return this.service.getlmodels();
      })
      .map((users: User[]) => {
        return _.sortBy(users, [function(obj: User) { return obj.name; }]);
      });

    this.rstream = this.route.params
      .switchMap((params: Params) => {
        return this.service.getrmodels();
      });

    this.detachedStream = this.rstream; // initially rstream are in detachedStream
  }

  onlSelect(model: User): void {
    this.service.getAttachedModels(model.id)
      .then(amodels => {
        this.attachedStream = Observable.of(amodels);
        let attachedaIds = amodels.map(amodel => amodel.id);
        this.updateDetachedModelsExcluding(attachedaIds);
        return null;
      });
  }
  onaSelect(): void {
    this.canDetach = this.lId && this.aIds && this.aIds.length > 0;
    this.logger.info('Status on DButton: ' + this.canDetach);
  }
  ondSelect(): void {
    this.canAttach = this.lId && this.dIds && this.dIds.length > 0;
    this.logger.info('Status on AButton: ' + this.canAttach);
  }
  attach() {
    this.detachedStream.subscribe(dmodel => {
      let dIdNums = this.dIds.map(each => +each); // convert string id into integer
      let dmodels = dmodel.filter(each => !dIdNums.includes(each.id));
      this.detachedStream = Observable.of(dmodels);
      this.canAttach = false; // reset the flag

      let dIdsNew = dmodels.map(dmodel => dmodel.id); // collect aIds of new amodels
      this.updateAttachedModelsExcluding(dIdsNew);
    });
  }

  detach() {
    this.attachedStream.subscribe(amodel => {   // remove the selected items from attached models
      let aIdsNums = this.aIds.map(each => +each); // convert string id into integer
      let amodels = amodel.filter(each => !aIdsNums.includes(each.id)); // filter out selected amodels
      this.attachedStream = Observable.of(amodels); // update attached stream after filtering
      this.canDetach = false; // reset the flag

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
      this.save();
    });
  }

  private updateAttachedModelsExcluding(attacheddIds: number[]) {
    this.rstream.subscribe(rmodel => {
      let availablerModels = rmodel.filter(each => !attacheddIds.includes(each.id));
      this.attachedStream = Observable.of(availablerModels);
      this.save();
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
