import { Injectable } from '@angular/core';
import {Fanad} from '../model/fanad.model';
import {AbstractService} from './abstract-service';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FanadService extends AbstractService<Fanad, number> {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/fanad', authService);
  }

  assignToMe(ad: Fanad): Observable<Fanad> {
    return this.http.put(this.actionUrl + '/assign', ad).map(resp => resp as Fanad);
  }

  getMyToApprove(): Observable<Fanad[]> {
    return this.http.get(this.actionUrl + '/toapprove').map(resp => resp as Fanad[]);
  }

  approve(ad: Fanad): Observable<Fanad> {
    return this.http.put(this.actionUrl + '/approve', ad).map(resp => resp as Fanad);;
  }
  disapprove(ad: Fanad): Observable<Fanad> {
    return this.http.put(this.actionUrl + '/disapprove', ad).map(resp => resp as Fanad);;
  }
  uploadImage(formData) {
    return this.http.post(this.actionUrl + '/new/', formData, {headers : this.authService.getAuthHeaderMultipart()})
      .map(resp => resp as Fanad);
  }
  updateItem(formData) {
    return this.http.post(this.actionUrl + '/update/', formData, {headers : this.authService.getAuthHeaderMultipart()})
      .map(resp => resp as Fanad);
  }
}
