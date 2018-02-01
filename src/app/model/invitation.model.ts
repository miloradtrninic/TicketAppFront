import {User} from './user.model';
import {Reservation} from './reservation.model';

export class Invitation {
  constructor(id: number, invitedUser: User, reservation: Reservation) {}
}
