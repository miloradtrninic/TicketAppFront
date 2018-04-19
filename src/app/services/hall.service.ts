import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service'
import { Genre } from '../model/genre.model';
import { Hall } from '../model/hall.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HallService extends AbstractService<Hall, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/hall', authService);
  }

  public getAllOfMyAuds(): Observable<Hall[]> {
    return this.http.get(this.actionUrl + '/myhalls').map(resp => resp as Hall[])
  }
  public getByAuditorium(id: number): Observable<Hall[]> {
    return this.http.get(this.actionUrl + '/byauditorim/' + id).map(resp => resp as Hall[])
  }
}
