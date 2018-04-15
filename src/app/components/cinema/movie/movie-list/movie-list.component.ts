import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../../model/movie.model';
import { MovieService } from '../../../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  detailMovie = -1;
  selected: Movie;
  message: string;
  movies : Movie[] = [];

  constructor(public movieService: MovieService) { }

  ngOnInit() {
    console.log("olalal" + this.movies);
  this.movieService.getAll().subscribe(
      (resp: Movie[]) => {
        this.movies = resp;
      }, error => {
        this.message = error;
      }
    );


  }

  onDetail(index: number)  {
    this.detailMovie = index;
  }

  offDetail()  {
    this.detailMovie = -1;
  }
 


}
