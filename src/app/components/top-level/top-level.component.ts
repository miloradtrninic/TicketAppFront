import { Component, OnInit } from '@angular/core';
import {HelperFunctions} from '../../shared/util/helper-functions';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-level',
  templateUrl: './top-level.component.html',
  styleUrls: ['./top-level.component.css']
})
export class TopLevelComponent implements OnInit {

  constructor(protected service: UserService, protected router: Router, protected redirectUrl: string) { }

  ngOnInit() {
    if (!HelperFunctions.isEmptyValue(window.localStorage.getItem('currentUser'))) {
      this.service.setLoginInfo();
    }
  }

}
