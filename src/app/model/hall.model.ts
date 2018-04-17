import {Auditorium} from './auditorium.model';
import {HallSegment} from './hallsegment.model';

export class Hall {
  constructor(public id: number, public name: string, public auditoriumName: Auditorium, public hallSegmentList: Array<HallSegment>) {}
}
