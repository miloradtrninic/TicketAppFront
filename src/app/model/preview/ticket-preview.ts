import {ProjectionPreview} from './projection-preview';
import {SeatingPreview} from './seating-preview';

export class TicketPreview {
  constructor(
    public projection: ProjectionPreview,
    public id: number,
    public time: Date,
    public seating: SeatingPreview,
    public price: number,
    public discount: number,
    public quickReservation: boolean
  ) {}
}
