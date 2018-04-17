import { Component, OnInit, Input } from '@angular/core';
import { Theatre } from '../../model/theatre.model';
import {Router, ActivatedRoute} from '@angular/router';
import { TheatreService } from '../../services/theatre.service';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {



  @Input() theatre: Theatre;
  latitude : number =  45.2671;
  longitude : number =  19.8335;
  message: string;
  id: number;
  theatres : Theatre[] = [];
  showmap = false;
  openPl = false;
  openPr = false;



  constructor(public theatreService: TheatreService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(window.location.href);
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
       this.theatreService.getOne(this.id).subscribe(
        (resp: Theatre) => {
          this.theatre = resp;
        }, error => {
          this.message = error;
        }
      );
   });
   console.log(window.location.href);
  }
  openPlays() {
    this.openPr = false;
    this.openPl = true;
   
    console.log("aaaaaaaaaaaaaaaa");
  
  }
  openProjection(){
    this.openPl = false;
    this.openPr = true;
    console.log("bbbbbbbbbbbbb");
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
