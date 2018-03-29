import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Fanzone} from '../model/fanzone.model';
import {Http} from '@angular/http';

@Injectable()
export class FanzoneService extends AbstractService<Fanzone, number> {
  constructor(http: Http) {
    super(http, '/fanzone');
  }
}
