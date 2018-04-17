import {HallSegment} from '../hallsegment.model';

export class HallCreation {
  constructor(public name: string, public audId: number, public hallSegmentList: Array<HallSegment>) {}
}
