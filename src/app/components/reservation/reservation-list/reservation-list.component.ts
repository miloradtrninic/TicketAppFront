import {Component, Input, OnInit} from '@angular/core';
import {ReservationService} from '../../../services/reservation.service';
import {ReservationPreview} from '../../../model/preview/reservation-preview';
import {Constants} from '../../../shared/constants/constants';
import {ListItem} from '../../../shared/model/list-item';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  @Input()
  private userId: number;
  private reservations: ReservationPreview[];
  private errormsg: string;
  private msg: string;
  private reservationToView: ReservationPreview;
  private readonly listType = Constants.ListType.COMMON;

  constructor(private service: ReservationService) {
    this.service.getAllForUser(this.userId)
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

  reservationClick(event) {
    const index = event.target.getAttribute('id');
    this.reservationToView = this.reservations[index];
    const list = this.reservationToView.ticketList;
    //Dodati getovanje hall i hallsegmenta
  }

  clearPreviewWindow(event) {
    this.reservationToView = null;
  }

  createListItems() {
    const ret: ListItem[] = [];

    for (let i = 0; i < this.reservations.length; i++) {
      const ticket = this.reservations[i].ticketList[0].projection;
      const toPush: ListItem = new ListItem(ticket.coverPath, ticket.name);
      ret.push(toPush);
    }

    return ret;
  }
}
