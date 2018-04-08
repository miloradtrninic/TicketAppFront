import { Injectable } from '@angular/core';
import {Theatre} from '../model/theatre.model';
import {Http} from '@angular/http';
import {AbstractService} from './abstract-service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TheatreService extends AbstractService<Theatre, number> {
  constructor(http: HttpClient) {
    super(http, '/theatre');
  }

}
