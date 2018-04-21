import { Injectable } from '@angular/core';
import {AbstractService} from './abstract-service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Invitation} from '../model/invitation.model';

@Injectable()
export class InvitationService extends AbstractService<Invitation, number> {

  constructor(public http: HttpClient, protected authService: AuthService) {
    super(http, '/invitation', authService);
  }

  getInvitationsForUser() {
    const options = {
      headers: this.authService.getAuthHeader()
    };

    const url = `${this.actionUrl}/getForUser/${this.authService.getToken().id}`;

    return this.http.get(url, options).map(res => res as Invitation[]);
  }

  declineInvitation(invId: number) {
    const options = {
      headers: this.authService.getAuthHeader()
    };

    const url = `${this.actionUrl}/decline/${invId}`;

    return this.http.put(url, options).map(res => res as string);
  }

  acceptInvitation(invId: number) {
    const options = {
      headers: this.authService.getAuthHeader()
    };

    const url = `${this.actionUrl}/accept/${invId}`;

    return this.http.put(url, options).map(res => res as string);
  }
}
