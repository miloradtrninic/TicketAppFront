import {Component, Input, OnInit} from '@angular/core';
import {Constants} from '../../../shared/constants/constants';
import {HallPreview} from '../../../model/preview/hall-preview';
import {HelperFunctions} from '../../../shared/util/helper-functions';
import {MovieService} from '../../../services/movie.service';
import {TheatreService} from '../../../services/theatre.service';
import {TerminService} from '../../../services/termin.service';
import {HallService} from '../../../services/hall.service';
import {TerminPreview} from '../../../model/preview/termin-preview';
import {HallSegmentPreview} from '../../../model/preview/hall-segment-preview';
import {Hall} from '../../../model/hall.model';
import {SeatingPreview} from '../../../model/preview/seating-preview';
import {UserPreview} from '../../../model/preview/user-preview.model';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import {Termin} from '../../../model/termin.model';
import {Ticket} from '../../../model/ticket.model';
import {TicketService} from '../../../services/ticket.service';
import {ReservationCreation} from '../../../model/creation/reservation-creation';
import {ReservationService} from '../../../services/reservation.service';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {

  /*Inputs*/
  @Input()
  private projection: any;
  @Input()
  private auditoriumId: number;

  /*Status variables*/
  private listType = Constants.ListType.COMMON;
  private errormsg: string;
  /********************/

  /*Selections*/
  private selectedTermin: Termin;
  private selectedHall: HallPreview;
  private selectedHallSegment: HallSegmentPreview;
  private inviteFriendsCount = 0;
  /***********/

  /*Arrays*/
  private availableTickets: Ticket[];
  private halls: Hall[];
  private hallSegments: HallSegmentPreview[];
  private seatings: SeatingPreview[];
  private selectedSeatings: SeatingPreview[];
  private friends: UserPreview[];
  private selectedFriends: UserPreview[];
  /*******/

  constructor(private terminService: TerminService, private hallService: HallService, private auth: AuthService,
              private userService: UserService, private ticketService: TicketService,
              private reservationService: ReservationService) { }

  ngOnInit() {
    this.ticketService.getAvailableTickets(this.projection.id)
      .subscribe(res => {
        this.availableTickets = res;
      }, err => {
        this.errormsg = err;
      })
  }

  selectTermin(termin) {
    this.selectedTermin = termin;
    this.halls = [];

    this.hallService.getByAuditorium(this.auditoriumId)
      .subscribe(res => {
        this.halls = res;
      }, err => {
        this.errormsg = err;
    });
  }

  createHallSelection() {
    return HelperFunctions.createListItems(this.halls, null, ['name']);
  }

  createHallSegmentSelection() {
    return HelperFunctions.createListItems(this.hallSegments, null, ['name']);
  }

  selectHall(hall: HallPreview) {
    this.selectedHall = hall;
    this.hallSegments = hall.hallSegmentList;
  }

  selectHallSegment(hallSegment: HallSegmentPreview) {
    this.selectedHallSegment = hallSegment;
    this.seatings = hallSegment.seatingList;
  }

  selectSeating(seating) {
    let index = 0;

    if (HelperFunctions.isEmptyValue(this.selectedSeatings)) {
      this.selectedSeatings = [];
    }
    index = this.seatings.indexOf(seating)
    if (index === -1) {
      console.log("Selection!");
      this.selectedSeatings.push(seating);
    } else {
      console.log("Deselect!");
      this.selectedSeatings.splice(index, 1);
    }

    this.inviteFriendsCount = this.selectedSeatings.length - 1;

    if (this.inviteFriendsCount > 0 && HelperFunctions.isEmptyValue(this.friends)) {
      this.userService.getUserFriends()
        .subscribe(res => {
          this.friends = res;
        }, err => {
          this.errormsg = err;
        })
    }
  }

  createInvFriends() {
    return HelperFunctions.createListItems(this.friends, null, ['name', 'lastname']);
  }

  createRMFriends() {
    return HelperFunctions.createListItems(this.selectedFriends, null, ['name', 'lastname']);
  }

  selectFriendToInv(friend) {
    this.selectedFriends.push(friend);
    this.friends.splice(this.friends.indexOf(friend), 1);
  }

  removeFriendFromInv(friend) {
    this.selectedFriends.splice(this.selectedFriends.indexOf(friend), 1);
    this.friends.push(friend);
  }

  createReservation() {
    const projectionId = this.projection.id;
    const ticketlist = [];
    const userList = [];

    for (let i = 0 ; i < this.selectedSeatings.length; i++) {
      for (let j = 0; j < this.availableTickets.length; j++) {
        if (this.selectedSeatings[i].id === this.availableTickets[j].seating.id) {
          ticketlist.push(this.availableTickets[j]);
        }
      }
    }

    for (let i = 0; i < this.selectedFriends.length; i++) {
      userList.push(this.selectedFriends[i].id);
    }

    const reserv = new ReservationCreation(this.auth.getToken().id, ticketlist, userList);

    this.reservationService.create(reserv)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log('Greska pri kreiranju na ra vnoooo');
      })
  }
}
