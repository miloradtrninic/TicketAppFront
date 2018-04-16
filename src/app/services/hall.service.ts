import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service'
import { Genre } from '../model/genre.model';
import { Hall } from '../model/hall.model';

@Injectable()
export class HallService extends AbstractService<Hall, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/hall', authService);
  }

}