import {SeatingPreview} from './seating-preview';
import {HallSegmentPreview} from './hall-segment-preview';

export class HallPreview {
  constructor(
    public id: number,
    public name: string,
    public seatingsNo: number,
    public hallSegmentList: HallSegmentPreview[],
  ) {}
}
