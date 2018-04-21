import { Injectable } from '@angular/core';
import {Theatre} from '../model/theatre.model';
import {Http} from '@angular/http';
import {AbstractService} from './abstract-service';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import {Play} from '../model/play.model';

@Injectable()
export class TheatreService extends AbstractService<Theatre, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/theatre', authService);
  }

  getAllPlays(id: number) {
    const options = {
      headers: this.authService.getAuthHeader()
    }
    return this.http.get(this.actionUrl + '/getAllPlays/' + id, options).map(res => res as Play[]);
  }
}
