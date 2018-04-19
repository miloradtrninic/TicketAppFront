import { Injectable } from '@angular/core';
import { Theatre }  from '../model/theatre.model';
import { Http } from '@angular/http';
import { AbstractService } from './abstract-service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Termin } from '../model/termin.model';

@Injectable()
export class TerminService extends AbstractService<Termin, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/termin', authService);
  }

}