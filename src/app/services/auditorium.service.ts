import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Auditorium} from '../model/auditorium.model';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuditoriumService extends AbstractService<Auditorium, number> {

  constructor(protected http: HttpClient, protected authService: AuthService) {
    super(http, '/auditorium', authService);
  }

}
