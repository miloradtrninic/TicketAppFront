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
import {Cinema} from '../../../model/cinema.model';
import {Theatre} from '../../../model/theatre.model';
import {CinemaService} from '../../../services/cinema.service';
import {Auditorium} from '../../../model/auditorium.model';
import {Projection} from '../../../model/projection.model';
import {AuditoriumPreview} from '../../../model/preview/auditorium-preview';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {

  /*Status variables*/
  private listType = Constants.ListType.COMMON;
  private errormsg: string;
  private selectedAuditoriumType: string;
  /********************/

  /*Selections*/
  private selectedAuditorium: AuditoriumPreview = null;
  private selectedProjection: Projection = null;
  private auditoriumId: number = null;
  private selectedTermin: Termin = null;
  private selectedHall: HallPreview = null;
  private selectedHallSegment: HallSegmentPreview = null;
  private inviteFriendsCount = 0;
  /***********/

  /*Arrays*/
  private cinemas: AuditoriumPreview[] = null;
  private theatres: AuditoriumPreview[] = null;
  private projections: Projection[] = null;
  private availableTickets: Ticket[] = null;
  private halls: Hall[] = null;
  private hallSegments: HallSegmentPreview[] = null;
  private seatings: SeatingPreview[] = null;
  private selectedSeatings: SeatingPreview[] = null;
  private friends: UserPreview[] = null;
  private selectedFriends: UserPreview[] = null;
  /*******/

  constructor(private cinemaService: CinemaService, private theatreService: TheatreService,
              private terminService: TerminService, private hallService: HallService, private auth: AuthService,
              private userService: UserService, private ticketService: TicketService,
              private reservationService: ReservationService) {

  }

  ngOnInit() {
    this.cinemaService.getAll()
      .subscribe(res => {
        this.cinemas = res;
      }, err => {
        this.errormsg = err;
      });

    this.theatreService.getAll()
      .subscribe(res => {
        this.theatres = res;
      }, err => {
        this.errormsg = err;
      });

    this.userService.getUserFriends()
      .subscribe(res => {
        this.friends = res;
        console.log(res);
      }, err => {
        this.errormsg = err;
      })
  }



  createHallSelection() {
    return HelperFunctions.createListItems(this.halls, null, ['name']);
  }

  createHallSegmentSelection() {
    return HelperFunctions.createListItems(this.hallSegments, null, ['name']);
  }

  createCinemaLI() {
    return HelperFunctions.createListItems(this.cinemas, null, ['name']);
  }

  createTheatreLI() {
    return HelperFunctions.createListItems(this.theatres, null, ['name']);
  }

  createProjectionLI() {
    return HelperFunctions.createListItems(this.projections, 'coverPath', ['name']);
  }

  createInvFriends() {
    return HelperFunctions.createListItems(this.friends, null, ['name', 'lastname']);
  }

  createRMFriends() {
    return HelperFunctions.createListItems(this.selectedFriends, null, ['name', 'lastname']);
  }

  selectAuditorium(aud: AuditoriumPreview) {
    this.selectedAuditorium = aud;
    this.auditoriumId = aud.id;
    this.selectedAuditoriumType = aud.entity_type;

    if (aud.entity_type === 'cinema') {
      this.cinemaService.getMovies(aud.id)
        .subscribe(res => {
          this.projections = res;
        }, err => {
          this.errormsg = err;
        })
    } else {
      this.theatreService.getAllPlays(aud.id)
        .subscribe(res => {
          this.projections = res;
        }, err => {
          this.errormsg = err;
        })
    }
  }

  selectProjection(proj: Projection) {
    this.selectedProjection = proj;
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

    this.ticketService.getAvailableTickets(this.selectedProjection.id)
      .subscribe(res => {
        this.availableTickets = res;
      }, err => {
        this.errormsg = err;
      })
  }

  selectHall(hall: HallPreview) {
    this.selectedHall = hall;
    this.hallSegments = hall.hallSegmentList;
  }

  selectHallSegment(hallSegment: HallSegmentPreview) {
    this.selectedHallSegment = hallSegment;
    this.seatings = hallSegment.seatingList;

    if (HelperFunctions.isEmptyValue(this.selectedFriends)) {
      this.selectedFriends = [];
    }
  }

  selectSeating(seating) {
    let index = 0;

    if (HelperFunctions.isEmptyValue(this.selectedSeatings)) {
      this.selectedSeatings = [];
    }
    index = this.selectedSeatings.indexOf(seating)
    if (index === -1) {
      console.log('Selection!');
      this.selectedSeatings.push(seating);
    } else {
      console.log('Deselect!');
      this.selectedSeatings.splice(index, 1);
    }

    this.inviteFriendsCount = this.selectedSeatings.length - 1;
  }

  selectFriendToInv(friend) {
    this.selectedFriends.push(friend);
    this.friends.splice(this.friends.indexOf(friend), 1);
  }

  removeFriendFromInv(friend) {
    this.selectedFriends.splice(this.selectedFriends.indexOf(friend), 1);
    this.friends.push(friend);
  }

  calculateAmmount() {
    if (!HelperFunctions.isEmptyValue(this.selectedSeatings)) {
      return this.selectedTermin.price * this.selectedSeatings.length;
    } else {
      return 0;
    }
  }

  createReservation() {
    const projectionId = this.selectedProjection.id;
    const ticketlist = [];
    const userList = [];

    for (let i = 0 ; i < this.selectedSeatings.length; i++) {
      for (let j = 0; j < this.availableTickets.length; j++) {
        if (this.selectedSeatings[i].id === this.availableTickets[j].seating.id) {
          ticketlist.push(this.availableTickets[j].id);
        }
      }
    }

    for (let i = 0; i < this.selectedFriends.length; i++) {
      userList.push(this.selectedFriends[i].id);
    }

    const reserv = new ReservationCreation(this.auth.getToken().id, ticketlist, userList, this.calculateAmmount());

    this.reservationService.create(reserv)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log('Greska pri kreiranju na ra vnoooo');
      })
  }
}
