import { Component, OnInit, Input, Output,ViewChild } from '@angular/core';
import { Cinema } from '../../model/cinema.model';
import {Router, ActivatedRoute} from '@angular/router';
import { CinemaService } from '../../services/cinema.service';
import { AgmCoreModule } from '@agm/core';
import { NgForm } from '@angular/forms';
import { UserAuditoriumCreation } from '../../model/creation/userauditorium-creation.model';
import { UserAuditoriumPreview } from '../../model/preview/userauditorium-preview';

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
  cinemas: Cinema[] = [];
  openM = false;
  openP = false;
  showmap = false;
  ratings = 0;
  num = 0;
  up = 0;
  down = 0;
  av = 0;
  stat = false;
  @ViewChild('addRate') form: NgForm;

  constructor(public cinemaService: CinemaService,  private route: ActivatedRoute) {
    
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

  rateCinema() {
    const creation = new UserAuditoriumCreation( this.cinema.id,this.form.value['ratings']);
    this.cinemaService.rateCinema(creation).subscribe(
      (resp: UserAuditoriumPreview) => {
        this.cinema.ratings = resp.rating;
      }, error => {
        this.message = error;
      }
    );

  /*  console.log(this.cinema.ratings);
     this.cinema.ratings =  this.cinema.ratings + this.ratings;
     this.num = this.num + 1;
     this.up =  this.cinema.ratings;
     this.down =  this.num ;
     this.av =this.up / this.down;
    console.log(this.ratings);
    console.log(this.cinema.ratings);
    console.log( "num "+this.num );
    console.log( "up "+this.up  );
    console.log( "down "+this.down  );*/
    
  }

  average() : number {
   
    return this.av;
  }

  seeStat() {
    if(this.stat) {
      this.stat = false;
    } else {
      this.stat = true;
    }
  }


  
}
