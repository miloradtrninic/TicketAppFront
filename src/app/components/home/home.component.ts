import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TopLevelComponent} from '../top-level/top-level.component';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {ListItem} from '../../shared/model/list-item';
import {Constants} from '../../shared/constants/constants';

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
    this.createDummyTest();
  }

  createDummyTest() {
    for (let i = 0; i < 20; i++) {
      const text = this.makeRandom();
      const item = new ListItem('assets/aaa.jpg', text);

      this.dummyItems.push(item);
    }
  }

  makeRandom() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  itemClicked(event) {
    const index = event.target.getAttribute('id');
   alert('Item clicked, with text: ' + this.dummyItems[index].text);
  }

  selectTheatre() {
    this.selectedTheatre = true;
  }

  selectCinema() {
    this.selectedCinema = true;
  }
}
