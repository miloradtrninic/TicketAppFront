import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Cinema} from '../model/cinema.model';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class CinemaService extends AbstractService<Cinema, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/cinema', authService);
  }

}
