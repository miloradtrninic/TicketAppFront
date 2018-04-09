import { Component, OnInit } from '@angular/core';
import { Theatre } from '../../model/theatre.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {


  detailTheatre = false;
  nodetailTheatre = true;
  currentURL='';

  theatres : Theatre[] = [
    new Theatre( 1, "Srpsko narodno", "Nenada Jovanovica 9", "Neki opis pozorista" , 2, "zona2" , "https://upload.wikimedia.org/wikipedia/commons/a/aa/Serbian_National_Theatre_Sept_2005.jpg"),
    new Theatre( 2, "Decije", "Nikole Pasica 43", "Neki opis pozorista2" , 4, "zona3", "https://upload.wikimedia.org/wikipedia/commons/a/aa/Serbian_National_Theatre_Sept_2005.jpg"),
    new Theatre( 2, "Beogradsko dramsko", "Petra Petrovica 22", "Neki opis pozorista3" , 4, "zona3", "https://upload.wikimedia.org/wikipedia/commons/a/aa/Serbian_National_Theatre_Sept_2005.jpg")
 
  ];


  constructor() { }

  ngOnInit() {
  }

  onDetail()  {
    if(this.detailTheatre) {
      this.detailTheatre = false;
      this.nodetailTheatre = true;
    } else {
      this.detailTheatre = true;
      this.nodetailTheatre = false;
    }
  }
  offDetail()  {
    if(this.nodetailTheatre) {
      this.nodetailTheatre = false;
      this.detailTheatre = true;
    } else {
      this.nodetailTheatre = true;
      this.detailTheatre = false;
    }
  }
  numTheatre() {
    this.currentURL = this.currentURL=window.location.href;
  }

 
}
