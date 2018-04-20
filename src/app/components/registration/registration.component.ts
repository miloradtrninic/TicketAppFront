import { Component, OnInit } from '@angular/core';
import { HelperFunctions } from '../../shared/util/helper-functions';
import {UserService} from '../../services/user.service';
import {UserCreation} from '../../model/creation/user-creation.model';
import {TopLevelComponent} from '../top-level/top-level.component';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent extends TopLevelComponent implements OnInit {
  registered = false;
  repeatPW = '';
  regInfo = {
    username: null,
    email: null,
    password: null,
    name: null,
    lastname: null,
    phoneNo: null,
    city: null
  };
  errorMessage = null;

  constructor(protected service: UserService, protected router: Router, protected auth: AuthService) {
    super(service, router, '/home');
  }

  ngOnInit() {
    super.ngOnInit();
  }

  tryRegister() {
    const areAnyEmptyValues = HelperFunctions.containsEmptyValues(this.regInfo);
    const arePasswordsMatching = this.regInfo.password === this.repeatPW;
    const shouldSendToServer = !areAnyEmptyValues && arePasswordsMatching;

    if (shouldSendToServer) {
      const user = (new UserCreation(this.regInfo.username, this.regInfo.email, this.regInfo.name,
                      this.regInfo.password, this.regInfo.lastname, this.regInfo.phoneNo));
      console.log(user);
      const ret = this.auth.register(user)
        .subscribe(res => {
          this.registered = true;
          this.errorMessage = null;
        },
          err => {
          this.registered = false;
          this.errorMessage = 'Error registering you. This was our fault. Please, try again.';
        });

    } else {
      this.clearImportantDetails();
      if (arePasswordsMatching === false) {
        this.errorMessage = 'Passwords don\'t match. Please, try again.';
      } else if (areAnyEmptyValues) {
        this.errorMessage = 'Some fields were left empty. Please, fill in the form and try again.';
      } else {
        this.errorMessage = 'Error registering you. Please, try again.';
      }
    }
  }

  hideError() {
    this.errorMessage = null;
  }

  validateInformation(param): boolean {
    return HelperFunctions.isEmptyValue(param);
  }

  clearAllInfo() {
    this.regInfo.password = '';
    this.repeatPW = '';
    this.regInfo.name = '';
    this.regInfo.lastname = '';
    this.regInfo.email = '';
    this.regInfo.phoneNo = '';
  }

  clearImportantDetails() {
    this.regInfo.password = '';
    this.repeatPW = '';
  }
}
