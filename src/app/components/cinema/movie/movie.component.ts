import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie.model';
import {Router, ActivatedRoute} from '@angular/router';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies : Movie[] = [];
  movie : Movie;
  id: number;

  constructor(public movieService: MovieService,  private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(window.location.href);
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
       this.movieService.getOne(this.id).subscribe(
        (resp: Movie) => {
          this.movie = resp;
        }, error => {
          this.movie = error;
        }
      );
   });
  }

}
