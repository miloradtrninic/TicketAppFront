import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Bid} from '../model/bid.model';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import {BidCreation} from '../model/creation/bid-creation.model';
import {MyBid} from "app/model/my-bid.model";

@Injectable()
export class BidService extends AbstractService<Bid, number> {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/bids', authService);
  }
  getMyBids() {
    return this.http.get(this.actionUrl + '/mybids', {headers: this.authService.getJSONAuthHeader()})
      .map(resp => resp as MyBid[]);
  }
}
