import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AbstractService} from './abstract-service';
import {Fanitem} from '../model/fanitem.model';

@Injectable()
export class FanItemService extends AbstractService<Fanitem, number> {
  constructor(http: Http) {
    super(http, '/fanitem');
  }
}
