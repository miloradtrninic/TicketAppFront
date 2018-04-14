import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {UserRole} from '../model/user-role.model';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserRoleService extends AbstractService<UserRole, number> {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/userroles', authService);
  }
}
