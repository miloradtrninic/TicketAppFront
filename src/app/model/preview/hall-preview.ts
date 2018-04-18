import {SeatingPreview} from './seating-preview';

export class HallPreview {
  constructor(
    public id: number,
    public name: string,
    public seatingsNo: number,
    public seatingList: SeatingPreview[],
  ) {}
}
