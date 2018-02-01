import {Hall} from './hall.model';
import {Seating} from './seating.model';

export class Hallsegment {
  constructor(id: number, hall: Hall, name: string, seatNo: number, seatingList: Array<Seating>) {}
}
