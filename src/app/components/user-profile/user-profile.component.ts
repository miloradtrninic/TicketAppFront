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
export class UserProfileComponent implements OnInit {

  private pw: string;
  private repeatpw: string;
  private errormsg: string;
  private mode: string;
  private user: UserPreview = new UserPreview(0, '', '', '', '', '', false, '', '');
  private friends: UserPreview[];
  private notFriends: UserPreview[];
  private shouldShowPWForm: boolean;
  private friendRequests: UserPreview[];
  private userEditInfo = {
    name: null,
    lastname: null,
    phoneNo: null,
    city: null,
    email: null
  };

  constructor(private service: UserService, private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.mode = Constants.State.VIEW;
    this.shouldShowPWForm = false;

    this.service.getOne()
      .subscribe(res => {
        this.user = new UserPreview(res.id, res.username, res.email, res.name,
                                    res.lastname, res.phoneNo, res.enabled, res.city, res.membershipName);
        this.restartEditInfo(res);
      },
      err => {
        this.errormsg = 'Error fetching user information';
      });

    this.service.getUserFriends()
      .subscribe(res => {
        this.friends = res;
      },
      err => {
        this.errormsg = 'Error fetching friends';
      });

    this.service.getNotUserFriends()
      .subscribe(res => {
          this.notFriends = res;
        },
        err => {
          this.errormsg = 'Error fetching users that are not friends';
      });

    this.service.getFriendRequests()
      .subscribe(res => {
        if (!HelperFunctions.isEmptyValue(res)) {
          this.friendRequests = res;
        }
      },
        err => {
          this.errormsg = 'Error fetching friend requests';
        })
  }

  changeMode() {
    switch (this.mode) {
      case Constants.State.VIEW: this.mode = Constants.State.EDIT; break;
      case Constants.State.EDIT: this.mode = Constants.State.VIEW; this.restartEditInfo(this.user); break;
      default: this.errormsg = 'Error switching modes'; break;
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
        this.mode = Constants.State.VIEW;
      },
        err => {
          this.errormsg = 'Error updating user information';
        })
  }

  addFriend(index) {
    this.service.sendFriendRequest(this.notFriends[index].id)
      .subscribe(res => {
        const removeMe = this.notFriends[index];
        if (HelperFunctions.isEmptyValue(this.friends)) {
          this.friends = [];
        }
        this.friends.push(removeMe);
        this.notFriends.splice(this.notFriends.indexOf(removeMe), 1);
      },
      err => {
        this.errormsg = 'Error adding friend';
      });
  }

  removeFriend(index) {
    this.service.removeFriend(this.friends[index].id)
      .subscribe(res => {
          const removeMe = this.friends[index];
          if (HelperFunctions.isEmptyValue(this.notFriends)) {
            this.notFriends = [];
          }
          this.notFriends.push(removeMe);
          this.friends.splice(this.friends.indexOf(removeMe), 1);
        },
        err => {
          this.errormsg = 'Error deleting friend';
        });
  }

  accept(user: UserPreview) {
    alert('Ja pozvan');
    this.service.acceptFriendship(user.id)
      .subscribe(res => {
        if (HelperFunctions.isEmptyValue(this.friends)) {
          this.friends = [];
        }
        this.friends.push(user);
        this.friendRequests.splice(this.friendRequests.indexOf(user), 1);
      })
  }

  decline(user: UserPreview) {
    this.service.declineFriendship(user.id)
      .subscribe(res => {
        if (HelperFunctions.isEmptyValue(this.notFriends)) {
          this.notFriends = [];
        }
        this.notFriends.push(user);
        this.friendRequests.splice(this.friendRequests.indexOf(user), 1);
      })
  }

  makeRequests() {
    return HelperFunctions.createRequestItems(this.friendRequests, ['name', 'lastname'],
      this.accept, this.decline, Constants.RequestType.ACPTDEC);
  }

  changePassword() {
    if (this.pw === this.repeatpw) {
      this.service.changePassword(this.pw)
        .subscribe( res => {
          window.localStorage.clear();
          this.router.navigate(['/login']);
        },
          err => {
            this.errormsg = 'Error changing password';
          })
    }
  }

  switchPWFormVisibility(event) {
    this.shouldShowPWForm = !this.shouldShowPWForm;
    this.pw = '';
    this.repeatpw = '';
  }

  createNonFriendsLI() {
    return HelperFunctions.createListItems(this.notFriends, null, ['name', 'lastname']);
  }

  createFriendsLI() {
    return HelperFunctions.createListItems(this.friends, null, ['name', 'lastname']);
  }

  createFriendRequests() {
    return HelperFunctions.createRequestItems(this.friendRequests, ['name', 'lastname'],
                                              this.accept, this.decline, Constants.RequestType.ACPTDEC);
  }
}
