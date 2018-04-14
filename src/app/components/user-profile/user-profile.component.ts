import { Component, OnInit } from '@angular/core';
import { Constants } from '../../shared/constants/constants';
import { HelperFunctions } from '../../shared/util/helper-functions';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user.model';
import {AuthService} from '../../services/auth.service';
import {UserPreview} from '../../model/preview/user-preview.model';
import {TopLevelComponent} from '../top-level/top-level.component';
import {Router} from '@angular/router';
import {Request} from '../../shared/model/request';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends TopLevelComponent implements OnInit {

  private mode: string;
  private user: UserPreview = new UserPreview(0, '', '', '', '', '', false, '', '');
  private friends: UserPreview[];
  private notFriends: UserPreview[];
  private shouldShowPWForm: boolean;
  private userEditInfo = {
    name: null,
    lastname: null,
    phoneNo: null,
    city: null,
    email: null
  };

  constructor(protected service: UserService, protected router: Router, private authService: AuthService) {
    super(service, router, null);
  }

  ngOnInit() {
    super.ngOnInit();
    this.mode = Constants.State.VIEW;
    this.shouldShowPWForm = false;

    this.service.getOne()
      .subscribe(res => {
        this.user = new UserPreview(res.id, res.username, res.email, res.name,
                                    res.lastname, res.phoneNo, res.enabled, res.city, res.membershipName);
        this.restartEditInfo(res);
      },
      err => {
        console.log('Navigate to register');
      });

    this.service.getUserFriends()
      .subscribe(res => {
        this.friends = res;
      },
      err => {
        console.log('Greska u dobavljanju prijatelja');
      });
    this.service.getNotUserFriends()
      .subscribe(res => {
          this.notFriends = res;
        },
        err => {
          console.log('Greska u dobavljanju ne-prijatelja :(');
      });
  }

  changeMode() {
    switch (this.mode) {
      case Constants.State.VIEW: this.mode = Constants.State.EDIT; break;
      case Constants.State.EDIT: this.mode = Constants.State.VIEW; this.restartEditInfo(this.user); break;
      default: console.log('Something went wrong...'); break;
    }
  }

  restartEditInfo(res) {
    this.userEditInfo.lastname = res.lastname;
    this.userEditInfo.name = res.name;
    this.userEditInfo.email = res.email;
    this.userEditInfo.city = res.city;
    this.userEditInfo.phoneNo = res.phoneNo;
  }

  updateInfo(event) {
    const up = new UserPreview(this.authService.loggedUserToken['id'], this.authService.loggedUserToken['username'],
                                this.userEditInfo.email, this.userEditInfo.name, this.userEditInfo.lastname,
                                this.userEditInfo.phoneNo, true, this.userEditInfo.city, this.user.membershipName);
    this.service.update(up)
      .subscribe(res => {
        this.user = res;
      },
        err => {
        console.log('Greska pri azuriranju');
        })
  }

  addFriend(index) {
    this.service.sendFriendRequest(this.notFriends[index].id)
      .subscribe(res => {
        const removeMe = this.notFriends[index];
        this.friends.push(removeMe);
        this.notFriends.splice(this.notFriends.indexOf(removeMe), 1);
      },
      err => {
        console.log('Ne mos dodati prijatelja...');
      });
  }

  removeFriend(index) {
    this.service.removeFriend(this.friends[index].id)
      .subscribe(res => {
          const removeMe = this.friends[index];
          this.notFriends.push(removeMe);
          this.friends.splice(this.friends.indexOf(removeMe), 1);
        },
        err => {
          console.log('Ne mos obrisati prijatelja...');
        });
  }

  accept(event) {
    alert('Accept click!');
  }

  decline(event) {
    alert('Decline click!');
  }

  makeReq() {
    const items = [];

    for (let i = 0; i < 5; i++) {
      items.push(new Request('Request' + i, Constants.RequestType.ACPTDEC, this.accept, this.decline));
    }

    return items;
  }

  switchPWFormVisibility(event) {
    this.shouldShowPWForm = !this.shouldShowPWForm;
  }
}
