import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../../../model/movie.model';
import {Router, ActivatedRoute} from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { DirectorService } from '../../../services/director.service';
import { ActorService } from '../../../services/actor.service';
import { NgForm } from '@angular/forms';
import { Termin } from '../../../model/termin.model';
import { Hall } from '../../../model/hall.model';
import { TerminService } from '../../../services/termin.service';
import { TerminUpdate } from '../../../model/update/termin-update.model';
import {TicketService} from '../../../services/ticket.service';

import { AuthService } from '../../../services/auth.service';

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
  discount: boolean;
  @ViewChild('editForm') form: NgForm;

  constructor(public movieService: MovieService, public authService: AuthService, public terminService: TerminService, private route: ActivatedRoute, private tickService: TicketService) { }

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
  fillFields(termin: Termin){
   this.selected = termin;
   this.form.controls['date'].setValue(this.selected.date);
   this.form.controls['price'].setValue(this.selected.price);

   console.log(this.selected);
   this.discount = this.selected.discount;
  }

  hasHall(idHall: number): boolean {
    let found = false;
    for (const a of this.selectedHalls) {
      if (a.id === idHall) {
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
    const terminUpdate : TerminUpdate = new TerminUpdate(this.selected.id,this.form.value['date'],
    this.form.value['price'],  this.form.value['discount']);
    this.terminService.update(terminUpdate).subscribe(
      resp => {

    const idx = this.movie.projectionTime.map(cin => cin.id).findIndex(id => id === resp.id);
    this.movie.projectionTime[idx] = resp;
    /*Update tickets*/
    this.tickService.updateTickets(resp.id)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
    /*END update*/
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }

  makeReservation() {

  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }
}
