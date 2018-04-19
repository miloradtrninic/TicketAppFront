import {TicketPreview} from '../preview/ticket-preview';

export class ReservationCreation {
  constructor(private reservedBy: number,
              private ticketList: TicketPreview[],
              private invitedUsersID: number[]) {}
}

