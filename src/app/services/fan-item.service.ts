import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AbstractService} from './abstract-service';
import {Fanitem} from '../model/fanitem.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FanItemService extends AbstractService<Fanitem, number> {
  constructor(http: HttpClient) {
    super(http, '/fanitem');
  }
}
