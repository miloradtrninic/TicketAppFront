import { Injectable } from '@angular/core';
import {Fanad} from '../model/fanad.model';
import {AbstractService} from './abstract-service';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class FanadService extends AbstractService<Fanad, number> {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/fanad', authService);
  }
}
