import { Component, OnInit, Input, Output } from '@angular/core';
import { Cinema } from '../../model/cinema.model';
import {Router, ActivatedRoute} from '@angular/router';
import { CinemaService } from '../../services/cinema.service';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  latitude : number =  45.2671;
  longitude : number =  19.8335;

  @Output() cinema: Cinema;
  message: string;
  id: number;
  cinemas : Cinema[] = [];
  openM = false;
  openP = false;
  showmap = false;
  constructor(public cinemaService: CinemaService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log(window.location.href);
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
       this.cinemaService.getOne(this.id).subscribe(
        (resp: Cinema) => {
          this.cinema = resp;
        }, error => {
          this.message = error;
        }
      );
   });
   console.log(window.location.href);
  }

  openMovies() {
    this.openP = false;
    this.openM = true;
  }
  openProjection(){
    this.openM = false;
    this.openP = true;
  }

  showMap(){
    if(this.showmap) {
      this.showmap = false;
    } else {
      this.showmap = true;
    }
  }
  onChooseLocation(event){
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }
}
