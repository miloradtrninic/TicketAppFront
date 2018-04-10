import {User} from './user.model';
import {Fanitem} from './fanitem.model';
import {Auditorium} from './auditorium.model';

export class Fanzone {
  constructor(public id: number, public admin: User, public fanitemList: Array<Fanitem>, public auditorium: Auditorium) {}
}
