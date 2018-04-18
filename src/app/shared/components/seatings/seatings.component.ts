import {Component, Input, OnInit} from '@angular/core';
import {SeatingPreview} from '../../../model/preview/seating-preview';
import {HallService} from '../../../services/hall.service';
import {HallPreview} from '../../../model/preview/hall-preview';

@Component({
  selector: 'app-seatings',
  templateUrl: './seatings.component.html',
  styleUrls: ['./seatings.component.scss']
})
export class SeatingsComponent implements OnInit {

  @Input()
  private message: string;
  @Input()
  private seatings: SeatingPreview[];
  private seatingsMatrix: SeatingPreview[][];
  private hallSegId: number;
  private hallSegment: HallPreview;
  private errormsg: string;

  constructor(private hallService: HallService) {
    /*hallService.getOne(this.hallSegId)
      .subscribe(res => {
        this.hallSegment = res;
        this.seatings = this.hallSegment.seatingList;
        //this.createSeatingsMatrix();
      }, err => {
        this.errormsg = err;
      });*/
    this.createDummySeatingsMatrix();
  }

  ngOnInit() {
  }


  findMaxRow() {
    let max = this.seatings[0].row;

    for (let i = 0; i < this.seatings.length; i++) {
      if (this.seatings[i].row > max) {
        max = this.seatings[i].row;
      }
    }

    return max;
  }

  findMaxNumber() {
    let max = this.seatings[0].number

    for (let i = 0; i < this.seatings.length; i++) {
      if (this.seatings[i].number > max) {
        max = this.seatings[i].number;
      }
    }

    return max;
  }

  createSeatingsMatrix() {
    this.seatingsMatrix = [];
    const maxRow = this.findMaxRow();
    const maxCol = this.findMaxNumber();
    let posInArr = 0;

    for (let i = 0; i < maxRow; i++) {
      const row: SeatingPreview[] = [];
      let shouldReset = false;
      while (shouldReset === false) {
        row.push(this.seatings[posInArr++]);
        shouldReset = posInArr % maxCol === 0 && posInArr !== 0;
      }
      this.seatingsMatrix[i] = row;
    }
  }

  createDummySeatingsMatrix() {
    this.seatingsMatrix = [];
    const maxRow = 6;
    const maxCol = 6;
    let posInArr = 0;

    for (let i = 0; i < maxRow; i++) {
      const row: SeatingPreview[] = [];
      let shouldReset = false;
      while (shouldReset === false) {
        row.push(new SeatingPreview(1, i, posInArr, false, null));
        posInArr++;
        shouldReset = posInArr % maxCol === 0 && posInArr !== 0;
      }
      this.seatingsMatrix[i] = row;
    }
  }
}
