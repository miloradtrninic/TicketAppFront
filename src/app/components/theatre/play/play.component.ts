import { Component, OnInit, ViewChild } from '@angular/core';
import { Play } from '../../../model/play.model';
import { PlayService } from '../../../services/play.service';
import { ActivatedRoute } from '@angular/router';
import { Termin } from '../../../model/termin.model';
import { Hall } from '../../../model/hall.model';
import { NgForm } from '@angular/forms';
import { TerminUpdate } from '../../../model/update/termin-update.model';
import { TerminService } from '../../../services/termin.service';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  plays : Play[] = [];
  message: string;
  play : Play;
  id: number;
  selected: Termin;
  newHall : Hall;
  selectedHalls: Array<Hall>;
  discount: boolean;
  
  @ViewChild('editForm') form: NgForm;

  constructor(public playService: PlayService, public authService: AuthService, public terminService: TerminService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = +params['playId'];
      this.playService.getOne(this.id).subscribe(
        (resp: Play) => {
          this.play = resp;
        }, error => {
          this.play = error;
        }
       );
   });
  }
  editTermin() {
    const terminUpdate : TerminUpdate = new TerminUpdate(this.selected.id,this.form.value['date'], 
    this.form.value['price'],  this.form.value['discount']);
    this.terminService.update(terminUpdate).subscribe(
      resp => {
      
    const idx = this.play.projectionTime.map(cin => cin.id).findIndex(id => id === resp.id);
    this.play.projectionTime[idx] = resp;
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
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

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

}
