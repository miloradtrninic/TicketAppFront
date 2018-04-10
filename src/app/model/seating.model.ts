import { Hallsegment } from "./hallsegment.model";


export class Seating {
  constructor(public id:number, public row: number, public number: number, public hallSegment: Hallsegment,
    public reserved: boolean) {

    }
}

