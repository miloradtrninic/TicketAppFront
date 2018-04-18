import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TopLevelComponent} from '../top-level/top-level.component';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {ListItem} from '../../shared/model/list-item';
import {Constants} from '../../shared/constants/constants';
import {HelperFunctions} from '../../shared/util/helper-functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends TopLevelComponent implements OnInit {

  private dummyItems = [];
  private userAuthenticated: boolean;
  selectedCinema = false;
  selectedTheatre = false;
  private readonly type = Constants.ListType.COMMON;

  constructor(protected service: UserService, protected router: Router) {
    super(service, router, null);
  }

  ngOnInit() {
    super.ngOnInit();
    this.userAuthenticated = true;
    this.dummyItems = HelperFunctions.createDummyTest(null);
  }

  itemClicked(item) {
    console.log(item);
  }

  selectTheatre() {
    this.selectedTheatre = true;
  }

  selectCinema() {
    this.selectedCinema = true;
  }
}
