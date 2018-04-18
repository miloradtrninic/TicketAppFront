import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Auditorium} from '../model/auditorium.model';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {AuditoriumPreview} from '../model/preview/auditorium-preview';

@Injectable()
export class AuditoriumService extends AbstractService<Auditorium, number> {

  constructor(protected http: HttpClient, protected authService: AuthService) {
    super(http, '/auditorium', authService);
  }

  getVisits(userId: number) {
    const options = {
      headers: this.authService.getAuthHeader()
    };

    return this.http.get(this.actionUrl, options).map(res => res as AuditoriumPreview[]);
  }
}
