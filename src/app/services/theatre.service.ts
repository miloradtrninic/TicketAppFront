import { Injectable } from '@angular/core';
import {Theatre} from '../model/theatre.model';
import {Http} from '@angular/http';
import {AbstractService} from './abstract-service';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class TheatreService extends AbstractService<Theatre, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/theatre', authService);
  }

}
