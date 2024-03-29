import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class OnlyAdminGuard implements CanActivate {

  constructor(private service: AuthService, private router: Router) {
    service.init();
  }

  canActivate() {
    console.log('Only admins');
    const isLogged = this.service.isLoggedInSimple();
    const hasRights = this.service.hasRole('ADMIN');

    if (!isLogged || hasRights) {
      this.router.navigate(['/login']);
    }

    return true;
  }
}
