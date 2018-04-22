import { Component, OnInit, ViewChild } from '@angular/core';
import { Play } from '../../../model/play.model';
import { TerminService } from '../../../services/termin.service';
import { PlayService } from '../../../services/play.service';
import { ActivatedRoute } from '@angular/router';
import { Seating } from '../../../model/seating.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-play-termin-list',
  templateUrl: './play-termin-list.component.html',
  styleUrls: ['./play-termin-list.component.css']
})
export class PlayTerminListComponent implements OnInit {

  reserved: Array<Seating>
  message: string;
  plays : Play[] = [];
 
  allowP = true;
  theatreId: number;
  play: Play;

  @ViewChild('reserveForm') form: NgForm;

  constructor(public terminService : TerminService, public playService: PlayService, public route: ActivatedRoute) {
    this.reserved = new Array();
   }

  ngOnInit() {
    console.log("play-termins" + this.plays);
   
    this.route.params.subscribe(
      params => {
        this.theatreId = +params['id'];
        this.playService.getAllFromTheatre(this.theatreId).subscribe(
         (resp: Play[]) => {
           this.plays = resp;
         }, error => {
           this.message = error;
         }
       );
       }, error => {}
    );
  }

  hasDiscount(play: Play) {
    return play.projectionTime.map(time => time.discount).findIndex(disc => disc === true) !== -1
  }

  forSale(num : number){
    return (num * 75 ) / 100;
  }

  
  reserveTermin(){

  }

  toArray(number): Array<number> {
    const array = new Array<number>();
    for (let i = 0; i < number; i++) {
      array.push(i);
    }
    return array;
  }

  reserveSeat(row: number, column: number) {
    const foundIndex = this.findSeat(row, column);
    if (foundIndex === -1) {
      this.reserved.push(new Seating(row, column, true));
    } else {
      this.reserved.splice(foundIndex, 1);
    }
  }

  findSeat(row: number, column: number) {
    return this.reserved.findIndex(s => s.row === row && s.number === column);
  }
}
