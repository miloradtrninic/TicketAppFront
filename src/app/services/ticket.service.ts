import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {AbstractService} from './abstract-service';
import {Ticket} from '../model/ticket.model';
import {TicketPreview} from '../model/preview/ticket-preview';

@Injectable()
export class TicketService extends AbstractService<Ticket, number> {

  constructor(protected http: HttpClient, private auth: AuthService) {
    super(http, '/ticket', auth);
  }

  getAvailableTickets(projId: number) {
    const options = {
      headers: this.auth.getAuthHeader()
    }

    return this.http.get(this.actionUrl + '/getAvailableTickets/' + projId, options).map(res => res as Ticket[]);
  }

  createTickets(terminId: number) {
    const options = {
      headers: this.auth.getAuthHeader()
    }

    return this.http.get(this.actionUrl + '/createTickets/' + terminId, options).map(res => res as Ticket[]);
  }

  updateTickets(terminId: number) {
    const options = {
      headers: this.auth.getAuthHeader()
    }

    return this.http.get(this.actionUrl + '/update/' + terminId, options).map(res => res as Ticket[]);
  }
}
