import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Cinema} from '../model/cinema.model';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import {Movie} from '../model/movie.model';

@Injectable()
export class CinemaService extends AbstractService<Cinema, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/cinema', authService);
  }

  getMovies(index : number) {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    return this.http.get(this.actionUrl + '/' + index + '/movies', options).map(res => res as Movie[])
  }
}
