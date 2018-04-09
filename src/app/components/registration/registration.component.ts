import { Component, OnInit } from '@angular/core';
import { HelperFunctions } from '../../shared/util/helper-functions';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  repeatPW = '';
  regInfo = {
    username: null,
    email: null,
    password: null,
    name: null,
    lastname: null,
    phoneNo: null,
  };
  errorMessage = null;

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  tryRegister() {
    const areAnyEmptyValues = HelperFunctions.containsEmptyValues(this.regInfo);
    const arePasswordsMatching = this.regInfo.password === this.repeatPW;
    const shouldSendToServer = !areAnyEmptyValues && arePasswordsMatching;

    if (shouldSendToServer) {
      const ret = this.service.register(this.regInfo);
      console.log(ret);
      this.errorMessage = null;
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
