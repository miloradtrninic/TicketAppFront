import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Genre } from '../model/genre.model';

@Injectable()
export class GenreService extends AbstractService<Genre, number> {
  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/genre', authService);
  }

}