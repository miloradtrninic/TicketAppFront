import {User} from './user.model';
import {Fanitem} from './fanitem.model';

export class Fanzone {
  constructor(id: number, admin: User, fanitemList: Array<Fanitem>) {}
}
