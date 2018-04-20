import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { Cinema } from '../model/cinema.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserAuditoriumPreview } from '../model/preview/userauditorium-preview';
import { UserAuditoriumCreation } from '../model/creation/userauditorium-creation.model';

@Injectable()
export class CinemaService extends AbstractService<Cinema, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/cinema', authService);
  }

  getMovies(index: number) {
    //tu dodati
  }
  rateCinema(creation: UserAuditoriumCreation) {
    const options = {
      headers: this.authService.getJSONAuthHeader()
    }
    const url = `${this.actionUrl}/rate`;

    return this.http.post(url, creation, options).map(resp => resp as UserAuditoriumPreview);
  }




}
