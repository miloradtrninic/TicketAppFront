import { Component, OnInit } from '@angular/core';
import { Payload } from '../../shared/util/payload';
import { CommunicatorService } from '../../shared/services/communicator.service';
import { HelperFunctions } from '../../shared/util/helper-functions';
import { Constants } from '../../shared/constants/Constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  url = 'api/auth/login';
  errorMessage=null;
  logInfo = {
    email: '',
    password: '',
    rememberMe: null,
  };

  constructor(private communicator: CommunicatorService) { }

  ngOnInit() {
  }

  clearAllInfo() {
    this.logInfo.email = '';
    this.logInfo.password = '';
  }

  tryLogin() {
    if(!HelperFunctions.containsEmptyValues(this.logInfo)){
      this.errorMessage = null;
      let payload = new Payload(this.url, null, null, this.logInfo);
      let user = this.communicator.execute(Constants.methods.GET,
                                           Constants.modelClassNames.USER,
                                           payload);
      console.log(user);
    } else {
      this.errorMessage = "Some fields were left empty. Please, fill in the form and try again.";
    }
  }

  hideError(){
    this.errorMessage = null;
  }
}
