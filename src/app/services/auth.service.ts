import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import { User } from '../model/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService extends AbstractService<User, number> {

  constructor(http: HttpClient) {
    super(http, '/auth');
  }

}
