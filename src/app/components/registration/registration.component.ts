import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  url = 'auth/register';

  regInfo = {
    password: '',
    repeatPW: '',
    name: '',
    surname: '',
    email: '',
    phoneno: '',
    city: '',
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  tryRegister() {
    this.http.post(this.url, this.regInfo)
    .subscribe(res => (console.log(res)));
  }

  clearAllInfo() {
    this.regInfo.password = '';
    this.regInfo.repeatPW = '';
    this.regInfo.name = '';
    this.regInfo.surname = '';
    this.regInfo.email = '';
    this.regInfo.phoneno = '';
  }

}
