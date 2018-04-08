import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Bid} from '../model/bid.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BidService extends AbstractService<Bid, number> {

  constructor(http: HttpClient) {
    super(http, '/bid');
  }

}
