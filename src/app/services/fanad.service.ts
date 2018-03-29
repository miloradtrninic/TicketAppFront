import { Injectable } from '@angular/core';
import {Fanad} from '../model/fanad.model';
import {AbstractService} from './abstract-service';
import {Http} from '@angular/http';

@Injectable()
export class FanadService extends AbstractService<Fanad, number> {

  constructor(http: Http) {
    super(http, '/fanad');
  }
}
