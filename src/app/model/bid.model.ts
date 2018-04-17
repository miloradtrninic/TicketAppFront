import {User} from './user.model';
import {Fanad} from './fanad.model';

export class Bid {

  constructor(public id: number, public fromUserUsername: string, public offer: number, public offerDate: Date) {
  }


}
