import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../../../model/movie.model';
import {Router, ActivatedRoute} from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { DirectorService } from '../../../services/director.service';
import { ActorService } from '../../../services/actor.service';
import { NgForm } from '@angular/forms';
import { Termin } from '../../../model/termin.model';
import { Hall } from '../../../model/hall.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies : Movie[] = [];
  message: string;
  movie : Movie;
  price = '';
  id: number;
  selected: Termin;
  newHall : Hall;
  selectedHalls: Array<Hall>;

  @ViewChild('editForm') form: NgForm;

  constructor(public movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['movieId'];
      this.movieService.getOne(this.id).subscribe(
        (resp: Movie) => {
          this.movie = resp;
        }, error => {
          this.movie = error;
        }
       );
   });

  }
  fillFields(){
   
  }

  hasHall(idHall: number): boolean {
    let found = false;
    for(const a of this.selectedHalls) {
      if(a.id === idHall){
        found = true;
        return found;
      }
    }
    return found;
  }
 
  removeHall(index: number) {
    this.selectedHalls.splice(index, 1);
  }

  selectHall() {
    if(this.newHall !== undefined && !this.hasHall(this.newHall.id)){
      this.selectedHalls.push(this.newHall);
      this.newHall = undefined;
    }
  }

  editTermin() {
    
  }
}