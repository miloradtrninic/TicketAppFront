import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {User} from '../model/user.model';
import {Http} from '@angular/http';

@Injectable()
export class RegistrationService extends AbstractService<User, number>{

  constructor(http: Http) {
    super(http, 'auth')
  }

}
