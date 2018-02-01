import {User} from './user.model';
import {Fanzone} from './fanzone.model';
import {Fanitem} from './fanitem.model';
import {Bid} from './bid.model';

export class Fanad {
  constructor(id: number, name: string, description: string, dateCreated: Date, imagePath: string,
              postedBy: User, fanZone: Fanzone, fanItem: Fanitem, accepted: boolean,
              expirationDate: Date, bidList: Array<Bid>) {}
}
