import { Component, OnInit, ViewChild } from '@angular/core';
import { Play } from '../../../model/play.model';
import { PlayService } from '../../../services/play.service';
import { ActivatedRoute } from '@angular/router';
import { Termin } from '../../../model/termin.model';
import { Hall } from '../../../model/hall.model';
import { NgForm } from '@angular/forms';

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

  @ViewChild('editForm') form: NgForm;

  constructor(public playService: PlayService, private route: ActivatedRoute) { }

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
