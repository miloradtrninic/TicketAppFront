import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  url = 'auth/login'

  logInfo = {
    email: '',
    password: '',
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  clearAllInfo() {
    this.logInfo.email = '';
    this.logInfo.password = '';
  }

  tryLogin() {
    this.http.post(this.url, this.logInfo)
    .subscribe(res => (console.log(res)));
  }

}
