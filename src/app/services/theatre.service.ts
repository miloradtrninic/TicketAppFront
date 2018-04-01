import { Injectable } from '@angular/core';
import {Theatre} from '../model/theatre.model';
import {Http} from '@angular/http';
import {AbstractService} from './abstract-service';

@Injectable()
export class TheatreService extends AbstractService<Theatre, number> {
  constructor(http: Http) {
    super(http, '/theatre');
  }

}
