import {SeatingPreview} from './seating-preview';

export class HallSegmentPreview {
  constructor(
    public id: number,
    public name: string,
    public seatingsNo: number,
    public seatingList: SeatingPreview[],
    public hallId: number,
  ) {}
}
