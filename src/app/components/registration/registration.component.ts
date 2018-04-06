import { Component, OnInit } from '@angular/core';
import { Payload } from '../../shared/util/payload';
import { CommunicatorService } from '../../shared/services/communicator.service';
import { HelperFunctions } from '../../shared/util/helper-functions';
import { Constants } from '../../shared/constants/Constants';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  url = 'api/auth/register';
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

  constructor(private communicator: CommunicatorService) { }

  ngOnInit() {
  }

  tryRegister() {
    const areAnyEmptyValues = HelperFunctions.containsEmptyValues(this.regInfo);
    const arePasswordsMatching = this.regInfo.password === this.repeatPW;
    const shouldSendToServer = !areAnyEmptyValues && arePasswordsMatching;

    if (shouldSendToServer) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      const payload = new Payload(this.url, headers, null, this.regInfo);
      const user = this.communicator.execute(Constants.HttpMethods.POST,
                                           Constants.modelClassNames.USER,
                                           payload);
      console.log(user);
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
