import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Injectable()
export class AdminFanGuardService implements CanActivate {

  constructor(private service: AuthService, private router: Router) {
    service.init();
  }

  canActivate() {
    const isLogged = this.service.loggedUserToken != null;
    const hasRights = isLogged && this.service.loggedUserToken.roles.indexOf('ADMIN_FAN') > -1;

    if (!isLogged && !hasRights) {
      this.router.navigate(['/login']);
    }

    return true;
  }
}
