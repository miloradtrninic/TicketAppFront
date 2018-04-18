import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ReservationService} from '../../services/reservation.service';
import {ActivatedRoute} from '@angular/router';
import {HelperFunctions} from '../../shared/util/helper-functions';
import {Constants} from '../../shared/constants/constants';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  private reservationTypes = Constants.ReservationType;
  private userId: number;
  private mode: string;
  private entityid: number;

  constructor(private auth: AuthService, private activRoute: ActivatedRoute) {
    this.userId = auth.getToken().id;
    const url = window.location.toString();
    const isCinema = this.activRoute.snapshot.params.cinema != null;
    const isTheatre = this.activRoute.snapshot.params.theatre != null;

    if (url.indexOf('/cinema') > -1) {
      this.mode = Constants.ReservationType.CINEMA;
      this.entityid = this.activRoute.snapshot.params.id;
    } else if (url.indexOf('/theatre') > -1) {
      this.mode = Constants.ReservationType.THEATRE;
      this.entityid = this.activRoute.snapshot.params.id;
    } else {
      this.mode = Constants.ReservationType.ALLFORUSER;
    }
    console.log("Url: " + url);
    console.log("User id: " + this.userId);
    console.log("Id:" + this.entityid);
    console.log("Mode: " + this.mode);
  }

  ngOnInit() {
  }
}
