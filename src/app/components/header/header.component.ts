import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  const uri='';
  const regUri='';
  const loginUri='';


  let regInfo = {
    password: '',
    repeatPW: '',
    name: '',
    surname: '',
    email: '',
    phoneno: '',
    city: '',
  };

  let logInfo = {
    email: '',
    password: '',
  };

  constructor() {

  }

  ngOnInit() {
  }

  tryRegister() {
    this.clearAllInfo();
    console.log("Spawn register clicked");
  }

  cancelClick(){
    this.clearAllInfo();
    console.log("Cancel clicked, cleared fields.");
  }

  clearAllInfo() {
    this.regInfo.password='';
    this.regInfo.repeatPW='';
    this.regInfo.name='';
    this.regInfo.surname='';
    this.regInfo.email='';
    this.regInfo.phoneno='';
    this.logInfo.password='';
  }

  tryLogin() {
    this.clearAllInfo();
    console.log("Spawn login clicked");
  }

}
