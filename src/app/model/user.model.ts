import {Fanad} from './fanad.model';
import {Bid} from './bid.model';
import {UserRole} from './user-role.model';
import {Membership} from './membership.model';

export class User {
  constructor(public id: number, public username: string, public  email: string, public  name: string, public lastname: string,
              public phoneNo: string, public  friends: string[], public  friendOf: string[], public  friendRequests: string[],
              public friendRequestsSent: string, public userAds: Array<Fanad>, public  bidList: Array<Bid>,
              public userRoles: Array<UserRole>, public  membership: Membership) {}
}
