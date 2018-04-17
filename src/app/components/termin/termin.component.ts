import { Component, OnInit ,ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie.model';
import { HallService } from '../../services/hall.service';
import { Hall } from '../../model/hall.model';
import { NgForm } from '@angular/forms';
import { HallCreation } from '../../model/creation/hall-creation.model';
import { TerminService } from '../../services/termin.service';
import { TerminCreation } from '../../model/creation/termin-creation.model';

@Component({
  selector: 'app-termin',
  templateUrl: './termin.component.html',
  styleUrls: ['./termin.component.css']
})
export class TerminComponent implements OnInit {

  movies: Array<Movie>;
  movie : Movie;
  times: Array<Number>
  message: string;
  nameHall = '';
  seatingsNo = '';
  time ='';
  discount = false; 
  price = '';
  
  


  halls: Array<Hall>;
  newHall : Hall;
  selectedHalls: Array<Hall>;

  @ViewChild('addForm') form : NgForm;

  constructor(public movieService: MovieService, public hallService: HallService,
                public terminService : TerminService) { 
                this.selectedHalls = new Array();
             }
  ngOnInit() {

    this.movieService.getAll().subscribe(
      resp => this.movies = resp, error => this.message = JSON.stringify(error)
    );
    this.hallService.getAll().subscribe(
      resp => this.halls = resp, error => this.message = JSON.stringify(error)
    );
  
  }
  addTermin(){
    console.log("aaat" +this.selectedHalls);
    const halls = this.selectedHalls.map(hall => hall.id);
    console.log(halls);
    const termin: TerminCreation = new TerminCreation(this.movie.id, halls, 
            this.form.value['date'], this.form.value['price'], this.form.value['discount']);
            console.log(termin);
    this.terminService.insert(termin).subscribe(
      resp => {

        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
   
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


}
