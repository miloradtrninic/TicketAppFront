import {Bid} from './bid.model';

export class MyBid extends Bid {
  constructor(public id: number, public fromUserUsername: string, public offer: number, public offerDate: Date, public fanAdName: string) {
      super(id, fromUserUsername, offer, offerDate);
  }
}
