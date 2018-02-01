import {Fanad} from './fanad.model';
import {Bid} from './bid.model';
import {UserRole} from './user-role.model';
import {Membership} from './membership.model';

export class User {
  constructor(id: number, username: string, email: string, name: string, lastname: string,
              phoneNo: string, friends: string[], friendOf: string[], friendRequests: string[], friendRequestsSent: string,
              userAds: Array<Fanad>, bidList: Array<Bid>, userRoles: Array<UserRole>, membership: Membership) {}
}
