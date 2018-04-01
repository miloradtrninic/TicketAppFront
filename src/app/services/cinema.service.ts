import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AbstractService} from './abstract-service';
import {Cinema} from '../model/cinema.model';

@Injectable()
export class CinemaService extends AbstractService<Cinema, number> {
  constructor(http: Http) {
    super(http, '/cinema');
  }

}
