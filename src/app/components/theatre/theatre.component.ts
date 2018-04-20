import {Component, OnInit, Input, NgZone} from '@angular/core';
import { Theatre } from '../../model/theatre.model';
import {Router, ActivatedRoute} from '@angular/router';
import { TheatreService } from '../../services/theatre.service';
import {GeocoderService} from '../../services/geocoder.service';

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



  constructor(public theatreService: TheatreService, private route: ActivatedRoute, private _zone: NgZone,
              private geocoderService: GeocoderService) { }

  ngOnInit() {
    console.log(window.location.href);
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
       this.theatreService.getOne(this.id).subscribe(
        (resp: Theatre) => {
          this.theatre = resp;
          this.getLatLonForAdress();
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


  }
  openProjection(){
    this.openPl = false;
    this.openPr = true;

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

  getLatLonForAdress() {
    this.geocoderService.getGeocoding(this.theatre.address)
      .subscribe(
        result => {
          // needs to run inside zone to update the map
          this._zone.run(() => {
            this.latitude = result.lat();
            this.longitude = result.lng();
          });
        },
        error => console.log(error),
        () => console.log('Geocoding completed!')
      );
  }
}
