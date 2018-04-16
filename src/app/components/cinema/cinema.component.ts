import { Component, OnInit, Input } from '@angular/core';
import { Cinema } from '../../model/cinema.model';
import {Router, ActivatedRoute} from '@angular/router';
import { CinemaService } from '../../services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  @Input() cinema: Cinema;
  message: string;
  id: number;
  cinemas : Cinema[] = [];
  openM = false;
  openP = false;
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
    this.openM = true;
  }
  openProjection(){
    this.openP = true;
  }
}
