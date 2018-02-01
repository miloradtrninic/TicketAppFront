import {Auditorium} from './auditorium.model';
import {Hallsegment} from './hallsegment.model';

export class Hall {
  constructor(id: number, name: string, auditorium: Auditorium, hallSegments: Array<Hallsegment>) {}
}
