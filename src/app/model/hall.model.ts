import {Auditorium} from './auditorium.model';
import {Hallsegment} from './hallsegment.model';

export class Hall {
  constructor(public id: number, public name: string,public auditorium: Auditorium,public hallSegmentListIds: Array<Hallsegment>) {}
}
