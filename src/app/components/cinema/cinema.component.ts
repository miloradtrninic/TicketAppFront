import { Component, OnInit } from '@angular/core';
import { Cinema } from '../../model/cinema.model';
@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  detailCinema = false;
  nodetailCinema = true;
  currentURL='';

  cinemas : Cinema[] = [
    new Cinema( 1, "Arena", "Jovana Jovanovica 3", "Neki opis bioskopa" , 4, "zona1" , "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ksenija_Bulatovic_Bioskop_Fontana.jpg"),
    new Cinema( 2, "Jadran", "Petra Jovanovica 4", "Neki opis bioskopa2" , 3, "zona2", "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ksenija_Bulatovic_Bioskop_Fontana.jpg"),
    new Cinema(3, "Arena2", "Petra Ivkovica 14", "Neki opis bioskopa3" , 1, "zona3", "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ksenija_Bulatovic_Bioskop_Fontana.jpg")
 
  ];
  constructor() { }

  ngOnInit() {
  }

  onDetail()  {
    if(this.detailCinema) {
      this.detailCinema = false;
      this.nodetailCinema = true;
    } else {
      this.detailCinema = true;
      this.nodetailCinema = false;
    }
  }

  offDetail()  {
    if(this.nodetailCinema) {
      this.nodetailCinema = false;
      this.detailCinema = true;
    } else {
      this.nodetailCinema = true;
      this.detailCinema = false;
    }
  }
  numCinema() {
    this.currentURL = this.currentURL=window.location.href;

  }

  
}
