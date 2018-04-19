import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Auditorium} from '../model/auditorium.model';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user.model';

@Injectable()
export class AuditoriumService extends AbstractService<Auditorium, number> {

  constructor(protected http: HttpClient, protected authService: AuthService) {
    super(http, '/auditorium', authService);
  }
  getAdminAuds(): Observable<Auditorium[]> {
    return this.http.get(this.actionUrl + '/admin', {headers: this.authService.getJSONAuthHeader()})
                .map(resp => resp as Auditorium[]);
  }
  getAuditoriumAdmins(id: number) {
    return this.http.get(this.actionUrl + '/' + id + '/admins', {headers: this.authService.getJSONAuthHeader()})
      .map(resp => resp as User[]);
  }
  updateAdmins(any) {
    return this.http.put(this.actionUrl + '/update/admins', any, {headers: this.authService.getJSONAuthHeader()});
  }

}
