import {User} from './user.model';
import {Reservation} from './reservation.model';

export class Invitation {
  constructor(public id: number, public invitedUser: User, public reservation: Reservation) {}
}
