import { Component, OnInit ,ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie.model';
import { HallService } from '../../services/hall.service';
import { Hall } from '../../model/hall.model';
import { NgForm } from '@angular/forms';
import { HallCreation } from '../../model/creation/hall-creation.model';
import { TerminService } from '../../services/termin.service';
import { TerminCreation } from '../../model/creation/termin-creation.model';
import { ActivatedRoute } from '@angular/router';
import { AuditoriumService } from '../../services/auditorium.service';

@Component({
  selector: 'app-termin',
  templateUrl: './termin.component.html',
  styleUrls: ['./termin.component.css']
})
export class TerminComponent implements OnInit {

  movies: Array<Movie>;
  movie : Movie;
  hall : Hall;
  times: Array<Number>
  message: string;
  time ='';
  discount = false; 
  price = '';
  


  halls: Array<Hall>;
  newHall : Hall;
  selectedHalls: Array<Hall>;
  projectionId: number;
  auditoriumId: number;
  @ViewChild('addForm') form : NgForm;

  constructor(public hallService: HallService,
              public terminService : TerminService, private route: ActivatedRoute) { 
              this.selectedHalls = new Array();
             }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectionId = +params['projId'];
    });
   this.route.params.subscribe(params => {
    this.auditoriumId = +params['id'];
    this.hallService.getByAuditorium(this.auditoriumId).subscribe(
      (resp: Hall[]) => {
        this.halls = resp;
      }, error => {
        this.message = error;
      }
     );
 });
  
  }
  addTermin(){
    console.log("aaat" +this.selectedHalls);
    const halls = this.selectedHalls.map(hall => hall.id);
    console.log(halls);
    const termin: TerminCreation = new TerminCreation(this.projectionId , halls, 
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
