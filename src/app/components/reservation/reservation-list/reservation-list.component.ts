import {Component, Input, OnInit} from '@angular/core';
import {ReservationService} from '../../../services/reservation.service';
import {ReservationPreview} from '../../../model/preview/reservation-preview';
import {Constants} from '../../../shared/constants/constants';
import {ListItem} from '../../../shared/model/list-item';
import {HelperFunctions} from '../../../shared/util/helper-functions';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  @Input()
  private userId: number;
  private dummies;
  private dummyItem = new ReservationPreview(0, null, null);
  private reservations;
  private errormsg: string;
  private msg: string;
  private hallSegId;
  private seatings;
  private reservationToView: ReservationPreview;
  private readonly listType = Constants.ListType.COMMON;

  constructor(private service: ReservationService) {
    this.service.getAllForUser(this.userId)
    this.getDummy();
  }

  ngOnInit() {
    this.seatings = [];
    this.service.getAllForUser(this.userId)
      .subscribe(res => {
        this.reservations = res;
      }, err => {
        this.errormsg = err;
      });
  }

  cancelReservation(event) {
    this.service.delete(this.reservationToView.id)
      .subscribe(res => {
        for (let i = 0; i < this.reservations.length; i++) {
          if (this.reservations[i].id === this.reservationToView.id) {
            this.reservations.splice(i, 1);
            break;
          }
        }
      }, err => {
        this.errormsg = err;
      });
  }

  reservationClick(reservation) {
    this.reservationToView = reservation;
    const list = this.reservationToView.ticketList;
    if(!HelperFunctions.isEmptyValue(list)) {
      this.hallSegId = list[0].seating.hallSegment;

      for (let i = 0; i < list.length; i++) {
        this.seatings.push(list[i].seating);
      }
    }
  }

  clearPreviewWindow(event) {
    this.reservationToView = null;
    this.seatings = [];
    this.hallSegId = null;
  }

  createListItems() {
    const ret: ListItem[] = [];

    for (let i = 0; i < this.reservations.length; i++) {
      const ticket = this.reservations[i].ticketList[0].projection;
      const toPush: ListItem = new ListItem(ticket.coverPath, ticket.name, this.reservations[i]);
      ret.push(toPush);
    }

    return ret;
  }

  canCancel() {
    if (HelperFunctions.isEmptyValue(this.reservationToView)) {
      return false;
    }
    const ms = 60000;
    const now = new Date();
    const cancelationTimeLimit = new Date(this.reservationToView.ticketList[0].time.valueOf() - 30 * ms);
    return now <= cancelationTimeLimit;
  }

  getDummy() {
    this.dummies = HelperFunctions.createDummyTest(this.dummyItem);
  }
}
