import {User} from './user.model';
import {Fanad} from './fanad.model';

export class Bid {

  constructor(public id: number, public fromUser: User,public offer: string, public fanAd: Fanad) {

  }


}
