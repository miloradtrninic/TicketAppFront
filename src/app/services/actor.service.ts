import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Actor } from '../model/actor.model';

@Injectable()
export class ActorService extends AbstractService<Actor, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/actor', authService);
  }

}