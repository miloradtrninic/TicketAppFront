import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Reservation} from '../model/reservation.model';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {ReservationPreview} from '../model/preview/reservation-preview';
import {Observable} from 'rxjs/Observable';
import {ReservationCreation} from '../model/creation/reservation-creation';

@Injectable()
export class ReservationService extends AbstractService<Reservation, number> {

  constructor(http: HttpClient, private auth: AuthService) {
    super(http, '/reservation', auth);
  }

  getAllForUser(userId: number): Observable<ReservationPreview[]> {
    const url = this.actionUrl + '/' + userId;
    const options = {
      headers: this.auth.getAuthHeader()
    }
    return this.http.get(url, options).map(res => res as ReservationPreview[]);
  }

  create(reservation: ReservationCreation): Observable<ReservationPreview> {
    const url = this.actionUrl + '/new';
    const options = {
      headers: this.auth.getAuthHeader()
    }

    return this.http.post(url, reservation, options).map(res => res as ReservationPreview);
  }
}
