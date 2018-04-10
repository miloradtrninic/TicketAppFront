import { Component, OnInit } from '@angular/core';
import { Cinema } from '../../../model/cinema.model';
import { CinemaService } from '../../../services/cinema.service';

@Component({
  selector: 'app-cinema-list',
  templateUrl: './cinema-list.component.html',
  styleUrls: ['./cinema-list.component.css']
})
export class CinemaListComponent implements OnInit {

  detailCinema = -1;
  currentURL='';
  routeAddCinema = 'http://localhost:4200/auditorium/cinema/addCinema';
  click = false;
  selected: Cinema;
  message: string;
  cinemas : Cinema[] = [];
  constructor(public cinemaService: CinemaService) { }

  ngOnInit() {
    this.cinemaService.getAll().subscribe(
      (resp: Cinema[]) => {
        this.cinemas = resp;
      }, error => {
        this.message = error;
      }
    );
  }

  onDetail(index: number)  {
    this.detailCinema = index;
  }

  offDetail()  {
    this.detailCinema = -1;
  }
  numCinema() {
    this.currentURL = this.currentURL=window.location.href;
  }

  currUrl() {
    return this.currentURL=window.location.href;
  }

  isClicked() {
    
  }
}
