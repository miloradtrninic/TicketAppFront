import { Component, OnInit,Input,ViewChild, Output } from '@angular/core';
import { Movie } from '../../../../model/movie.model';
import { MovieService } from '../../../../services/movie.service';
import { Director } from '../../../../model/director.model';
import { DirectorService } from '../../../../services/director.service';
import { ActorService } from '../../../../services/actor.service';
import { GenreService } from '../../../../services/genre.service';
import { Genre } from '../../../../model/genre.model';
import { Actor } from '../../../../model/actor.model';
import { Cinema } from '../../../../model/cinema.model';
import { ActivatedRoute } from '@angular/router';
import { MovieUpdate } from '../../../../model/update/movie-update.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  detailMovie = -1;
  @Output()   selected: Movie;
  message: string;
  movies : Movie[] = [];
  name = '';
  description = '';
  duration = '';
  poster = '';
  director = '';
  allowP = true;
  
  genres: Array<Genre>;
  newGenre: Genre;
  selectedGenres: Array<Genre>;

  actors : Array<Actor>;
  newActor : Actor;
  selectedActors: Array<Actor>;

  directors: Array<Director>;
  newDirector : Director;
  cinemaId: number;

  @ViewChild('editForm') form: NgForm;

  constructor(public movieService: MovieService, public directorService : DirectorService, public authService: AuthService,
                public actorService :ActorService, public genreService: GenreService, public route: ActivatedRoute) {
                    this.selectedGenres = new Array();
                    this.selectedActors = new Array();
       }

  ngOnInit() {
    console.log("olalal" + this.movies);
 //  console.log("olalal" + this.movies.id);
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
    
    this.genreService.getAll().subscribe(
      resp => this.genres = resp, error => this.message = JSON.stringify(error)
    );
    this.actorService.getAll().subscribe(
      resp => this.actors = resp, error => this.message = JSON.stringify(error)
    );
    this.directorService.getAll().subscribe(
      resp => this.directors = resp, error => this.message = JSON.stringify(error)
    );
  }

  fillFields(selected){
    this.name = selected.name;
    this.description = selected.description;
    this.duration = selected.durationMinutes;
    this.poster = selected.coverPath;
  }

  deleteMovie(index){
    console.log('delete movie');
    this.movieService.delete(index).subscribe(
      resp => {
        this.movies.splice(index, 1);
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }
 
  editMovie(){
    console.log('edit movie');
    console.log(this.selected);
    const movieUpdate : MovieUpdate = new MovieUpdate(this.selected.id, this.form.value['name'], 
    this.form.value['description'],  this.form.value['duration'], this.poster);
    this.movieService.update(movieUpdate).subscribe(
      resp => {
    const idx = this.movies.map(cin => cin.id).findIndex(id => id === resp.id);
    this.movies[idx] = resp;
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }


  onDetail(index: number)  {
    this.detailMovie = index;
  }

  offDetail()  {
    this.detailMovie = -1;
  }

  allowPreview1() {
    this.allowP = false;
  }

  allowPreview2() {
    this.allowP = true;  
  }

  hasDirector(idDirector: number): boolean {
    let found = false;

    if(this.newDirector.id === idDirector){
        found = true;
        return found;
      }
    return found;
  }

  hasActor(idActor: number): boolean {
    let found = false;
    for(const a of this.selectedActors) {
      if(a.id === idActor){
        found = true;
        return found;
      }
    }
    return found;
  }
 
  removeActor(index: number) {
    this.selectedActors.splice(index, 1);
  }

  selectActor() {
    if(this.newActor !== undefined && !this.hasActor(this.newActor.id)){
      this.selectedActors.push(this.newActor);
      this.newActor = undefined;
    }
  }

  hasGenre(idGenre: number): boolean {
    let found = false;
    for(const g of this.selectedGenres) {
      if(g.id === idGenre){
        found = true;
        return found;
      }
    }
    return found;
  }

  removeGenre(index: number) {
    this.selectedGenres.splice(index, 1);
  }

  selectGenre() {
    if(this.newGenre !== undefined && !this.hasGenre(this.newGenre.id)){
      this.selectedGenres.push(this.newGenre);
      this.newGenre = undefined;
    }
  }
  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }


}
