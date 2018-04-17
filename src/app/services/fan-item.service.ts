import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AbstractService} from './abstract-service';
import {Fanitem} from '../model/fanitem.model';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FanItemService extends AbstractService<Fanitem, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/fanitem', authService);
  }
  getFanZoneByAuditorium(audId: number): Observable<Fanitem[]> {
    return this.http.get(this.actionUrl + '/' + audId).map(resp => resp as Fanitem[]);
  }
}
