import { Component, OnInit } from '@angular/core';
import { Termin } from '../../../model/termin.model';
import { TerminService } from '../../../services/termin.service';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../model/movie.model';

@Component({
  selector: 'app-movie-termin-list',
  templateUrl: './movie-termin-list.component.html',
  styleUrls: ['./movie-termin-list.component.css']
})
export class MovieTerminListComponent implements OnInit {


  message: string;
  movies : Movie[] = [];
  detailTermin = -1;
  allowP = true;
  cinemaId: number;

  constructor(public terminService : TerminService, public movieService: MovieService,public route: ActivatedRoute) { }

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

  onDetail(index: number)  {
    this.detailTermin = index;
  }

  offDetail()  {
    this.detailTermin = -1;
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

}
