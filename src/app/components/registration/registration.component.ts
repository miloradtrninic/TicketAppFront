import { Component, OnInit } from '@angular/core';
import { Payload } from '../../shared/util/payload';
import { CommunicatorService } from '../../shared/services/communicator.service';
import { HelperFunctions } from '../../shared/util/helper-functions';
import { Constants } from '../../shared/constants/Constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  url = 'api/auth/hey';
  repeatPW = "";
  regInfo = {
    password: '',
    name: '',
    surname: '',
    email: '',
    phoneno: '',
    city: '',
  };
  errorMessage = null;

  constructor(private communicator: CommunicatorService) { }

  ngOnInit() {
  }

  tryRegister() {
    const areAnyEmptyValues = HelperFunctions.containsEmptyValues(this.regInfo);
    const arePasswordsMatching = this.regInfo.password === this.repeatPW;
    let shouldSendToServer = !areAnyEmptyValues && arePasswordsMatching;

    if(shouldSendToServer) {
      let payload = new Payload(this.url, null, null, this.regInfo);
      let user = this.communicator.execute(Constants.methods.GET,
                                           Constants.modelClassNames.USER,
                                           payload);
      console.log(user);
      this.errorMessage = null;
    } else {
      this.clearImportantDetails();
      if(arePasswordsMatching === false) {
        this.errorMessage = "Passwords don't match. Please, try again.";
      } else if(areAnyEmptyValues) {
        this.errorMessage = "Some fields were left empty. Please, fill in the form and try again.";
      }
      else{
        this.errorMessage = "Error registering you. Please, try again.";
      }
    }
  }

  hideError(){
    this.errorMessage = null;
  }

  validateInformation(param):boolean {
    return HelperFunctions.isEmptyValue(param);
  }

  clearAllInfo() {
    this.regInfo.password = '';
    this.repeatPW = '';
    this.regInfo.name = '';
    this.regInfo.surname = '';
    this.regInfo.email = '';
    this.regInfo.phoneno = '';
  }

  clearImportantDetails() {
    this.regInfo.password = '';
    this.repeatPW = '';
  }

}
