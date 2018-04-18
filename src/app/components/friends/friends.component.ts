import { Component, OnInit } from '@angular/core';
import {UserPreview} from '../../model/preview/user-preview.model';
import {Constants} from '../../shared/constants/constants';
import {HelperFunctions} from '../../shared/util/helper-functions';
import {UserService} from '../../services/user.service';
import {Request} from '../../shared/model/request';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  private friends;
  private notFriends;
  private friendRequests;
  private errormsg: string;

  constructor(private service: UserService) { }

  ngOnInit() {
    /*this.friendRequests = this.makeItems();
    this.friends = this.makeItems();
    this.notFriends = this.makeItems();*/
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
        });
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
    this.service.acceptFriendship(user.id)
      .subscribe(res => {
        if (HelperFunctions.isEmptyValue(this.friends)) {
          this.friends = [];
        }
        this.friends.push(res);
        this.notFriends.splice(this.notFriends.indexOf(res), 1);
      })
  }

  decline(user: UserPreview) {
    this.service.declineFriendship(user.id)
      .subscribe(res => {
        if (HelperFunctions.isEmptyValue(this.notFriends)) {
          this.notFriends = [];
        }
        this.notFriends.push(res);
        this.friends.splice(this.friends.indexOf(res), 1);
      })
  }

  makeRequests() {
    const items = [];

    if (!HelperFunctions.isEmptyValue(this.friendRequests)) {
      for (let i = 0; i < this.friendRequests.length; i++) {
        items.push(new Request('Request' + i, Constants.RequestType.ACPTDEC, this.friendRequests[i], this.accept, this.decline));
      }
    }
    return items;
  }

  sortByName(array) {
    array = HelperFunctions.sortArrayByKey(array, 'name');
  }

  sortByLastName(array) {
    array = HelperFunctions.sortArrayByKey(array, 'lastname');
  }

  makeItems() {
    const items = [];

    for (let i = 0; i < 20; i++) {
      const item = {
        'name': this.makeRandom(),
        'lastname': this.makeRandom(),
      };
      items.push(item);
    }

    return items;
  }

  makeRandom() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
