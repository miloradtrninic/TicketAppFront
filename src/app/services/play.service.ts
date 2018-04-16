import { Injectable } from '@angular/core';
import { Theatre }  from '../model/theatre.model';
import { Http } from '@angular/http';
import { AbstractService } from './abstract-service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Play } from '../model/play.model';

@Injectable()
export class PlayService extends AbstractService<Play, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/play', authService);
  }

}