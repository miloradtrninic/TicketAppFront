import { Component, OnInit } from '@angular/core';
import { Theatre } from '../../model/theatre.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {


  detailTheatre = -1;
  currentURL='';
  click = false;
  selected: Theatre;

  theatres : Theatre[] = [
    new Theatre( 1, "Srpsko narodno", "Nenada Jovanovica 9", "Neki opis pozorista" , 2, "zona2" , "https://upload.wikimedia.org/wikipedia/commons/a/aa/Serbian_National_Theatre_Sept_2005.jpg"),
    new Theatre( 2, "Decije", "Nikole Pasica 43", "Neki opis pozorista2" , 4, "zona3", "https://upload.wikimedia.org/wikipedia/commons/a/aa/Serbian_National_Theatre_Sept_2005.jpg"),
    new Theatre( 2, "Beogradsko dramsko", "Petra Petrovica 22", "Neki opis pozorista3" , 4, "zona3", "https://upload.wikimedia.org/wikipedia/commons/a/aa/Serbian_National_Theatre_Sept_2005.jpg")
 
  ];


  constructor() { }

  ngOnInit() {
  }

  onDetail(index: number)  {
    this.detailTheatre = index;
  }

  offDetail()  {
    this.detailTheatre = -1;
  }
  numTheatre() {
    this.currentURL = this.currentURL=window.location.href;
  }

 
}
