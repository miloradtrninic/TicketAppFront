import {Fanad} from './fanad.model';
import {Bid} from './bid.model';
import {UserRole} from './user-role.model';
import {Membership} from './membership.model';

export class User {
  constructor(public id: number, public username: string, public  email: string, public  name: string, public lastname: string,
              public phoneNo: string, public userRoles: Array<UserRole>, public  membershipName: string, public enabled: boolean) {}
}
