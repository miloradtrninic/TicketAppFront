import {Component, OnInit, ViewChild} from '@angular/core';
import {Auditorium} from '../../../../../model/auditorium.model';
import {HallSegment} from '../../../../../model/hallsegment.model';
import {Seating} from '../../../../../model/seating.model';
import {NgForm} from '@angular/forms';
import {HallService} from '../../../../../services/hall.service';
import {HallCreation} from '../../../../../model/creation/hall-creation.model';
import {AuditoriumService} from '../../../../../services/auditorium.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Hall} from '../../../../../model/hall.model';

@Component({
  selector: 'app-modify-hall',
  templateUrl: './modify-hall.component.html',
  styleUrls: ['./modify-hall.component.css']
})
export class ModifyHallComponent implements OnInit {
  hallToEdit: Hall;
  auditoriums: Array<Auditorium>;
  segments: Array<HallSegment>;
  reserved: Array<Seating>
  rows: number;
  columns: number;
  message: string;
  error: string;
  audId: number;
  selectedSegment: HallSegment;
  @ViewChild('sf') segmentForm: NgForm;
  @ViewChild('hf') hallForm: NgForm;
  constructor(public hallService: HallService, private router: Router, private routeActive: ActivatedRoute,
              public auditoriumService: AuditoriumService) {
    this.reserved = new Array();
    this.segments = new Array();
    this.auditoriums = new Array();
  }

  ngOnInit() {
    this.routeActive.params.subscribe(
      param => {
        let hallId = 0;
        if (param['hallId'] === undefined) {
          this.auditoriumService.getAdminAuds().subscribe(
            resp => this.auditoriums = resp, error2 => this.error = JSON.stringify(error2)
          );
        } else {
          hallId = +param['hallId'];
          this.hallService.getOne(hallId).subscribe(
            resp => {
              this.hallToEdit = resp;
              this.segments = this.hallToEdit.hallSegmentList;
              this.hallForm.controls['name'].setValue(this.hallToEdit.name);
              this.hallForm.controls['name'].enable({onlySelf:false});
            }, error2 => this.error = JSON.stringify(error2)
          )
        }
      }
    );
  }
  reserveSeat(row: number, column: number) {
    const foundIndex = this.findSeat(row, column);
    if (foundIndex === -1) {
      this.reserved.push(new Seating(row, column, true));
    } else {
      this.reserved.splice(foundIndex, 1);
    }
  }
  findSeat(row: number, column: number) {
    return this.reserved.findIndex(s => s.row === row && s.number === column);
  }

  toArray(number): Array<number> {
    const array = new Array<number>();
    for (let i = 0; i < number; i++) {
      array.push(i);
    }
    return array;
  }
  insertSegment() {
    const seatings = new Array<Seating>();
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const res: Seating = this.reserved.find(s => s.row === i && s.number === j);
        if (res === undefined) {
          seatings.push(new Seating(i, j, false))
        } else {
          seatings.push(res);
        }
      }
    }
    if (this.selectedSegment === undefined) {
      const segment = new HallSegment(this.segmentForm.value['segName'], seatings.length, seatings);
      this.segments.push(segment);
    } else {
      this.selectedSegment.name = this.segmentForm.value['segName'];
      this.selectedSegment.seatingsNo = seatings.length;
      this.selectedSegment.seatingList = seatings;
    }
    this.segmentForm.resetForm();
    this.columns = 0;
    this.rows = 0;
  }
  newHall() {
    if (this.hallToEdit === undefined) {
      const newHall: HallCreation = new HallCreation(this.hallForm.value['name'],
        this.hallForm.value['audit'].id, this.segments);
        this.hallService.insert(newHall)
          .subscribe(resp => this.message = 'Added successfully.', error2 => this.error = JSON.stringify(error2));
    } else {
        this.hallToEdit.name = this.hallForm.value['name'];
        this.hallToEdit.hallSegmentList = this.segments;
        console.log(this.hallToEdit);
        this.hallService.update(this.hallToEdit)
          .subscribe(resp => this.message = 'Successfully updated.', error2 => this.error = JSON.stringify(error2));
    }
  }
  selectSegment(segment: HallSegment) {
    console.log('select');
    this.segmentForm.controls['segName'].setValue(segment.name);
    this.reserved = segment.seatingList.filter(seg => seg.reserved);
    this.rows = segment.seatingList.map(seg => seg.row).sort((a, b) => b - a)[0] + 1;
    this.columns = segment.seatingList.map(seg => seg.number).sort((a, b) => b - a)[0] + 1;
    this.selectedSegment = segment;
  }
}
