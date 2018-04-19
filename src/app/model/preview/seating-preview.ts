import {HallSegmentPreview} from './hall-segment-preview';

export class SeatingPreview {
  constructor(
    public id: number,
    public row: number,
    public number: number,
    public reserved: boolean,
    public hallSegment: HallSegmentPreview
  ) {}
}
