import { HallSegment } from './hallsegment.model';


export class Seating {
  constructor(public row: number, public number: number, public reserved?: boolean,
              public id?: number, public hallSegment?: HallSegment) {

    }
}

