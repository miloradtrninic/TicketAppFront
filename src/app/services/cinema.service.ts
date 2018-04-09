import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {Cinema} from '../model/cinema.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CinemaService extends AbstractService<Cinema, number> {
  constructor(http: HttpClient) {
    super(http, '/cinema');
  }

}
