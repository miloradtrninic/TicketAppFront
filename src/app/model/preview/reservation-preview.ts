import {UserPreview} from './user-preview.model';
import {TicketPreview} from './ticket-preview';

export class ReservationPreview {
  constructor(
    public id: number,
    public reservedBy: UserPreview,
    public ticketList: TicketPreview[]
  ) {}
}
