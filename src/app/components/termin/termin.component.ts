import { Component, OnInit ,ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie.model';
import { HallService } from '../../services/hall.service';
import { Hall } from '../../model/hall.model';
import { NgForm } from '@angular/forms';
import { HallCreation } from '../../model/creation/hall-creation.model';

@Component({
  selector: 'app-termin',
  templateUrl: './termin.component.html',
  styleUrls: ['./termin.component.css']
})
export class TerminComponent implements OnInit {

  movies: Array<Movie>;
 
  times: Array<Number>
  message: string;
  nameHall = '';
  seatingsNo = '';
  time ='';

  halls: Array<Hall>;
  newHall : Hall;
  selectedHalls: Array<Hall>;

  @ViewChild('addHall') formHall : NgForm;
  @ViewChild('addTime') formTime : NgForm;

  constructor(public movieService: MovieService, public hallService: HallService) { }

  ngOnInit() {

    this.movieService.getAll().subscribe(
      resp => this.movies = resp, error => this.message = JSON.stringify(error)
    );
    this.hallService.getAll().subscribe(
      resp => this.halls = resp, error => this.message = JSON.stringify(error)
    );
  }
  addHall(){
  /*  console.log("Dodaaaaaaaajem hall");
    const dir : HallCreation = new HallCreation(this.formHall.value['nameHall'],
    movies.id, 0);
    this.directorService.insert(dir).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );*/
   
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
  addTime() {
    this.times.push(this.formTime.value['time']);
    console.log("aaaaaa" + this.times);
  }

}
