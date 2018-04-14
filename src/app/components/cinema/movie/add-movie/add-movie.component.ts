import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MovieService } from '../../../../services/movie.service';
import { Movie } from '../../../../model/movie.model';
import { NgForm } from '@angular/forms';
import { MovieCreation } from '../../../../model/creation/movie-creation.model';
import { DirectorCreation } from '../../../../model/creation/director-creation.model';
import { DirectorService } from '../../../../services/director.service';
import { ActorService } from '../../../../services/actor.service';
import { ActorCreation } from '../../../../model/creation/actor-creation.model';
import { GenreService } from '../../../../services/genre.service';
import { GenreCreation } from '../../../../model/creation/genre-creation.model';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {


  name = '';
  address = '';
  description = '';
  poster = '';
  duration = '';
  director = '';
  actor = '';
  genre = '';
  firstNameDirector = '';
  lastNameDirector = '';
  firstNameActor = '';
  lastNameActor = '';
  genreName = '';
  message: string;
  allowP = true;
  detailMovie = -1;
  @Input() movie: Movie;
  @ViewChild('addForm') form: NgForm;
  @ViewChild('addDirector') formDirector : NgForm;
  @ViewChild('addActor') formActor : NgForm;
  @ViewChild('addGenre') formGenre : NgForm;
  constructor(public movieService: MovieService, public directorService : DirectorService,
              public actorService :ActorService, public genreService: GenreService) { }

  ngOnInit() {
  }

  allowPreview() {
    this.allowP = true;
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

  add() {
    console.log('add movie');
    const movie: MovieCreation = new MovieCreation(this.form.value['name'], null ,this.form.value['director'], 
            this.form.value['duration'], this.form.value['poster'], this.form.value['description'] );
    this.movieService.insert(movie).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }
  addDirector(){
    console.log("Dodaaaaaaaajem direktrora");
    const dir : DirectorCreation = new DirectorCreation(this.formDirector['firstNameDirector'],
    this.formDirector['lastNameDirector']);
    this.directorService.insert(dir).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }

  addActor(){
    console.log("Dodaaaaaaaajem actora");
    const act : ActorCreation = new ActorCreation(this.formActor['firstNameActor'],
    this.formActor['lastNameActor']);
    this.actorService.insert(act).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }
  addGenre(){
    console.log("Dodaaaaaaaajem zanr");
    const gen : GenreCreation = new GenreCreation(this.formGenre['genreName']);
    this.genreService.insert(gen).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }

}
