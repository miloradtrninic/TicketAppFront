import { Injectable } from '@angular/core';
import { Theatre }  from '../model/theatre.model';
import { Http } from '@angular/http';
import { AbstractService } from './abstract-service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Movie } from '../model/movie.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MovieService extends AbstractService<Movie, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/movie', authService);
  }
  getAllFromCinema(cinemaId: number): Observable<Movie[]> {
   return this.http.get(this.actionUrl + '/allFromCinema/'+cinemaId).map(resp=> resp as Movie[]);
  }
}