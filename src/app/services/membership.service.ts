import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Membership} from '../model/membership.model';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MembershipService extends AbstractService<Membership, number> {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/membership', authService);
  }

}
