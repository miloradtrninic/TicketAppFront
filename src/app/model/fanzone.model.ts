import {User} from './user.model';
import {Fanitem} from './fanitem.model';
import {Auditorium} from './auditorium.model';

export class Fanzone {
  constructor(public id: number, public adminUsername: Array<string>, public auditoriumName: string,  public fanitemList: Array<Fanitem>) {}
}
