import {User} from './user.model';
import {Fanzone} from './fanzone.model';
import {Fanitem} from './fanitem.model';
import {Bid} from './bid.model';

export class Fanad {
  constructor(public id: number, public name: string, public description: string, public dateCreated: Date, public imagePath: string,
              public postedBy: User, public fanZone: Fanzone, public accepted: boolean,
              public expirationDate: Date, public admin: User, public bidList: Array<Bid>) {}
}
