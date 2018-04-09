import { Component, OnInit } from '@angular/core';
import { HelperFunctions } from '../../shared/util/helper-functions';
import {UserService} from '../../services/user.service';
import {AuthenticationRequest} from '../../model/authentication-request';

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

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  clearAllInfo() {
    this.logInfo.email = '';
    this.logInfo.password = '';
  }

  tryLogin() {
    if (!HelperFunctions.containsEmptyValues(this.logInfo)) {
      this.errorMessage = null;
      const ret = this.service.login(new AuthenticationRequest(this.logInfo.email, this.logInfo.password));
      console.log(ret);
    } else {
      this.errorMessage = 'Some fields were left empty. Please, fill in the form and try again.';
    }
  }

  hideError() {
    this.errorMessage = null;
  }
}
