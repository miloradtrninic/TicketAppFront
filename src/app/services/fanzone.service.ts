import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Fanzone} from '../model/fanzone.model';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FanzoneService extends AbstractService<Fanzone, number> {
  constructor(http: HttpClient) {
    super(http, '/fanzone');
  }
}
