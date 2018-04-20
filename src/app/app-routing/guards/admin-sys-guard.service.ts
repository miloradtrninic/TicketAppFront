import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Injectable()
export class AdminSysGuardService implements CanActivate {

  constructor(private service: AuthService, private router: Router) {
    service.init();
  }

  canActivate() {
    const isLogged = this.service.isLoggedInSimple();
    const hasRights = this.service.hasRole('ADMIN_SYS');
    console.log('is logged' + isLogged);
    console.log('has rights' + hasRights);
    if (!isLogged || !hasRights) {
      this.router.navigate(['/login']);
    }

    return true;
  }
}
