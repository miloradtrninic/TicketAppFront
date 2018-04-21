import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Injectable()
export class OnlyAnonymousService implements CanActivate {

  constructor(private service: AuthService, private router: Router) {
    service.init();
  }

  canActivate() {
    const isLogged = this.service.isLoggedInSimple();
    if (isLogged) {
      this.router.navigate(['/home']);
    }
    return true;
  }
}
