import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Director } from '../model/director.model';

@Injectable()
export class DirectorService extends AbstractService<Director, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/director', authService);
  }

}