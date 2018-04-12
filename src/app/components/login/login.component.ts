import { Component, OnInit } from '@angular/core';
import { HelperFunctions } from '../../shared/util/helper-functions';
import {UserService} from '../../services/user.service';
import {AuthenticationRequest} from '../../model/authentication-request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private errorMessage= null;
  private logInfo = {
    email: '',
    password: ''
  };

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

  clearAllInfo() {
    this.logInfo.email = '';
    this.logInfo.password = '';
  }

  tryLogin() {
    if (!HelperFunctions.containsEmptyValues(this.logInfo)) {
      this.errorMessage = null;
      this.service.login(new AuthenticationRequest(this.logInfo.email, this.logInfo.password))
        .subscribe(ret => {
          console.log('Ulogovan!');
          this.errorMessage = null;
          this.router.navigate(['/home']);
        }, err => {
          if (err['error'] != null && typeof err['error'] !== 'object') {
            this.errorMessage = err['error'];
          }
        });
    } else {
      this.errorMessage = 'Some fields were left empty. Please, fill in the form and try again.';
    }
  }

  hideError() {
    this.errorMessage = null;
  }
}
