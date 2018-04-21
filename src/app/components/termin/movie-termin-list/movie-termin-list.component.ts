import { Component, OnInit, ViewChild } from '@angular/core';
import { Termin } from '../../../model/termin.model';
import { TerminService } from '../../../services/termin.service';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../model/movie.model';
import { NgForm } from '@angular/forms';
import { Seating } from '../../../model/seating.model';

@Component({
  selector: 'app-movie-termin-list',
  templateUrl: './movie-termin-list.component.html',
  styleUrls: ['./movie-termin-list.component.css']
})
export class MovieTerminListComponent implements OnInit {

  reserved: Array<Seating>
  message: string;
  movies : Movie[] = [];
  allowP = true;
  cinemaId: number;
  movie: Movie;
  @ViewChild('reserveForm') form: NgForm;

  constructor(public terminService : TerminService, public movieService: MovieService,public route: ActivatedRoute) {
    this.reserved = new Array();

   }

  ngOnInit() {
    console.log("olalal" + this.movies);
   
      this.route.params.subscribe(
        params => {
          this.cinemaId = +params['id'];
          this.movieService.getAllFromCinema(this.cinemaId).subscribe(
           (resp: Movie[]) => {
             this.movies = resp;
           }, error => {
             this.message = error;
           }
         );
         }, error => {}
      );

  }

  reserveTermin(){

  }

  toArray(number): Array<number> {
    const array = new Array<number>();
    for (let i = 0; i < number; i++) {
      array.push(i);
    }
    return array;
  }

  reserveSeat(row: number, column: number) {
    const foundIndex = this.findSeat(row, column);
    if (foundIndex === -1) {
      this.reserved.push(new Seating(row, column, true));
    } else {
      this.reserved.splice(foundIndex, 1);
    }
  }

  findSeat(row: number, column: number) {
    return this.reserved.findIndex(s => s.row === row && s.number === column);
  }
  
  allowPreview1() {
    this.allowP = false;
  }

  allowPreview2() {
    this.allowP = true;  
  }

  forSale(num : number){
    
    return (num * 75 ) / 100;
  }
  hasDiscount(movie: Movie) {
    return movie.projectionTime.map(time => time.discount).findIndex(disc => disc === true) !== -1
  }
}
