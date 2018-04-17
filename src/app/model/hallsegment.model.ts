import {Hall} from './hall.model';
import {Seating} from './seating.model';

export class HallSegment {
  constructor(public name: string, public seatingsNo: number, public seatingList: Array<Seating>, public id?: number, public hall?: Hall) {}
}
