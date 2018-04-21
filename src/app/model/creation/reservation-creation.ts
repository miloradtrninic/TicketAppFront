import {TicketPreview} from '../preview/ticket-preview';

export class ReservationCreation {
  constructor(private reservedBy: number,
              private ticketList: number[],
              private invitedUsersID: number[],
              private price: number) {}
}

