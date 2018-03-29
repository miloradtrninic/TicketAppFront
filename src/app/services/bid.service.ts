import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Bid} from '../model/bid.model';
import {Http} from '@angular/http';

@Injectable()
export class BidService extends AbstractService<Bid, number> {

  constructor(http: Http) {
    super(http, '/bid');
  }

}
