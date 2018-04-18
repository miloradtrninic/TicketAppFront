import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Director } from '../../../../model/director.model';
import { Genre } from '../../../../model/genre.model';
import { Actor } from '../../../../model/actor.model';
import { Theatre } from '../../../../model/theatre.model';
import { NgForm } from '@angular/forms';
import { DirectorService } from '../../../../services/director.service';
import { ActorService } from '../../../../services/actor.service';
import { GenreService } from '../../../../services/genre.service';
import { PlayCreation } from '../../../../model/creation/play-creation.model';
import { Play } from '../../../../model/play.model';
import { PlayService } from '../../../../services/play.service';
import { DirectorCreation } from '../../../../model/creation/director-creation.model';
import { ActorCreation } from '../../../../model/creation/actor-creation.model';
import { GenreCreation } from '../../../../model/creation/genre-creation.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-play',
  templateUrl: './add-play.component.html',
  styleUrls: ['./add-play.component.css']
})
export class AddPlayComponent implements OnInit {

  name: string;
  description: string;
  poster: string;
  duration: number;
  director: Director;
  firstNameDirector = '';
  lastNameDirector = '';
  firstNameActor = '';
  lastNameActor = '';
  genreName = '';
  message: string;
  allowP = true;
  detailPlay = -1;

  genres: Array<Genre>;
  newGenre: Genre;
  selectedGenres: Array<Genre>;

  actors: Array<Actor>;
  newActor: Actor;
  selectedActors: Array<Actor>;

  directors: Array<Director>;
  newDirector: Director;
  thetreId: number;
  @Input() play: Play;
  @ViewChild('addForm') form: NgForm;
  @ViewChild('addDirector') formDirector: NgForm;
  @ViewChild('addActor') formActor: NgForm;
  @ViewChild('addGenre') formGenre: NgForm;

  constructor(public playService: PlayService, public directorService: DirectorService,
     public actorService: ActorService, public genreService: GenreService, private route: ActivatedRoute) {
          this.selectedGenres = new Array();
          this.selectedActors = new Array();  
  }

  ngOnInit() {
    this.route.params.subscribe(
      parms=> this.thetreId = +parms['id']
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

  allowPreview() {
    this.allowP = true;
  }

  onDetail(index: number)  {
    this.detailPlay = index;
  }

  offDetail()  {
    this.detailPlay = -1;
  }

  allowPreview1() {
    this.allowP = false;
  }

  allowPreview2() {
    this.allowP = true;  
  }

  addPlay() {
    
    const director_id = this.form.value['newDirector'].id;
    const actors = this.selectedActors.map(act=>act.id);
    const genres = this.selectedGenres.map(gen=>gen.id);
    const play: PlayCreation = new PlayCreation(this.form.value['name'], 0, director_id,
      actors, genres, this.form.value['duration'], this.form.value['poster'],
      this.form.value['description'], this.thetreId);
    console.log(play);
    this.playService.insert(play).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }

  addDir(){
    console.log("Dodaaaaaaaajem direktrora");
    const dir : DirectorCreation = new DirectorCreation(this.formDirector.value['firstNameDirector'],
      this.formDirector.value['lastNameDirector']);
    this.directorService.insert(dir).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
    this.firstNameDirector = '';
    this.lastNameDirector = '';
  }

  hasDirector(idDirector: number): boolean {
    let found = false;

    if(this.newDirector.id === idDirector){
        found = true;
        return found;
      }
    return found;
  }

  //ACTOR
  addAct(){
    console.log("Dodaaaaaaaajem actora");
    const act : ActorCreation = new ActorCreation(this.formActor.value['firstNameActor'],
      this.formActor.value['lastNameActor']);
    this.actorService.insert(act).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
    this.firstNameActor = '';
    this.lastNameActor ='';
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

  //GENRE
  addGen(){
    console.log("Dodaaaaaaaajem zanr");
    const gen : GenreCreation = new GenreCreation(this.formGenre.value['genreName']);
    this.genreService.insert(gen).subscribe(
      resp => {
        this.genres.push(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
    this.genreName = '';
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
  


}
