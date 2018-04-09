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
  cinemas : Cinema[] = [
    new Cinema( 1, "Arena", "Jovana Jovanovica 3", "Neki opis bioskopa" , 4, "zona1" , "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ksenija_Bulatovic_Bioskop_Fontana.jpg"),
    new Cinema( 2, "Jadran", "Petra Jovanovica 4", "Neki opis bioskopa2" , 3, "zona2", "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ksenija_Bulatovic_Bioskop_Fontana.jpg"),
    new Cinema(3, "Arena2", "Petra Ivkovica 14", "Neki opis bioskopa3" , 1, "zona3", "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ksenija_Bulatovic_Bioskop_Fontana.jpg")
 
  ];
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
