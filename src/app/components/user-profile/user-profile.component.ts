import { Component, OnInit } from '@angular/core';
import { Constants } from '../../shared/constants/constants';
import { HelperFunctions } from '../../shared/util/helper-functions';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private mode: string;
  private user: User = new User(0, 'rixon', 'milosribar@yahoo.com', 'Riki',
    'Bogotac', '0611586802',
    'Gejacka republika, tamo dje trava raste',
    null, null, null, null,
    null, null, null, null);
  private allUsers: Array<User>;
  private shouldShowPWForm: boolean;
  private userEditInfo = {
    name: null,
    lastname: null,
    phoneNo: null,
    city: null,
    password: null
  }

  constructor(private service: UserService) { }

  ngOnInit() {
    this.mode = Constants.State.VIEW;
    this.shouldShowPWForm = false;
    // this.user = this.service.getByToken();
    // this.allUsers = this.service.getAll();
  }

  changeMode() {
    switch (this.mode) {
      case Constants.State.VIEW: this.mode = Constants.State.EDIT; break;
      case Constants.State.EDIT: this.mode = Constants.State.VIEW; break;
      default: console.log('Something went wrong...'); break;
    }
  }

  updateInfo(event) {
    console.log('Update clicked');
  }

  addFriend(event) {
    console.log('Add friend clicked');
  }

  removeFriend(event) {
    console.log('Remove friend clicked');
  }

  switchPWFormVisibility(event) {
    this.shouldShowPWForm = !this.shouldShowPWForm;
  }

  usersInFriendList() {
    return null;
  }

  usersNotInFriendList() {
    return null;
  }
}
