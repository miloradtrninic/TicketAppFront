import { Component, OnInit } from '@angular/core';
import { Cinema } from '../../model/cinema.model';
@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  cinemas : Cinema[] = [
    new Cinema( 1, "Arena", "Jovana Jovanovica 3", "Neki opis bioskopa" , 4, "zona1" , "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ksenija_Bulatovic_Bioskop_Fontana.jpg"),
    new Cinema( 2, "Jadran", "Petra Jovanovica 4", "Neki opis bioskopa2" , 3, "zona2", "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ksenija_Bulatovic_Bioskop_Fontana.jpg")
  ];
  constructor() { }

  ngOnInit() {
  }

}
