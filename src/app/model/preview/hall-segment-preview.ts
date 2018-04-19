import {SeatingPreview} from './seating-preview';

export class HallSegmentPreview {
  constructor(
    public id: number,
    public name: string,
    public auditoriumName: string,
    public seatingList: SeatingPreview[],
  ) {}
}
