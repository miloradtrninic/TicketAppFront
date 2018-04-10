import { Seating } from "./seating.model";


export class Ticket {
  constructor(public id: number, public time: Date, public seating: Seating, public price : number,
  public discount: number, public quickReservation: boolean ) {}
}
