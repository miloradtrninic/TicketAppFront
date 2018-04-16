import {Injectable} from '@angular/core';
import {CanActivate, Route, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Injectable()
export class OnlyLoggedInGuard implements CanActivate {

  constructor(private service: AuthService, private router: Router) {
    service.init();
  }

  canActivate() {
    console.log('Only logged in users.')
    const hasRights = this.service.loggedUserToken != null;

    if (!hasRights) {
      this.router.navigate(['/login']);
    }

    return hasRights;
  }
}
