import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Play } from '../../../../model/play.model';
import { Genre } from '../../../../model/genre.model';
import { Actor } from '../../../../model/actor.model';
import { Director } from '../../../../model/director.model';
import { PlayService } from '../../../../services/play.service';
import { DirectorService } from '../../../../services/director.service';
import { ActorService } from '../../../../services/actor.service';
import { GenreService } from '../../../../services/genre.service';
import { PlayUpdate } from '../../../../model/update/play-update.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})
export class PlayListComponent implements OnInit {

  detailPlay = -1;
  @Output() selected: Play;
  message: string;
  plays : Play[] = [];
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

  @ViewChild('editForm') form: NgForm;

  constructor(public playService: PlayService, public directorService : DirectorService,
    public actorService :ActorService, public genreService: GenreService) { 
                    this.selectedGenres = new Array();
                    this.selectedActors = new Array();
    }

  ngOnInit() {
    console.log("sve predstave" + this.plays);
    this.playService.getAll().subscribe(
      (resp: Play[]) => {
        this.plays = resp;
      }, error => {
        this.message = error;
      }
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
    this.newDirector = selected.director;
    this.director = selected.director;
    this.description = selected.description;
    this.duration = selected.durationMinutes;
    this.poster = selected.coverPath;
  }

  deletePlay(index){
    console.log('delete play');
    this.playService.delete(index).subscribe(
      resp => {
        this.plays.splice(index, 1);
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }
  editPlay() {
    console.log('edit play');
    console.log(this.selected);
    const playUpdate : PlayUpdate = new PlayUpdate(this.selected.id, this.form.value['name'], 
    this.form.value['description'],  this.form.value['duration'], this.form.value['coverPath']);
    this.playService.update(playUpdate).subscribe(
      resp => {
    const idx = this.plays.map(cin => cin.id).findIndex(id => id === resp.id);
    this.plays[idx] = resp;
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
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
 
}
