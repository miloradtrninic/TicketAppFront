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
  private reservationToView: ReservationPreview;
  private readonly listType = Constants.ListType.COMMON;

  constructor(private service: ReservationService) {
    this.service.getAllForUser(this.userId)
    this.getDummy();
  }

  ngOnInit() {
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
    const hallSegment = list[0].seating.hallSegment;
  }

  clearPreviewWindow(event) {
    this.reservationToView = null;
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

  getDummy() {
    this.dummies = HelperFunctions.createDummyTest(this.dummyItem);
  }
}
