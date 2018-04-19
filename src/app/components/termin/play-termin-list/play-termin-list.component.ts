import { Component, OnInit } from '@angular/core';
import { Play } from '../../../model/play.model';
import { TerminService } from '../../../services/termin.service';
import { PlayService } from '../../../services/play.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play-termin-list',
  templateUrl: './play-termin-list.component.html',
  styleUrls: ['./play-termin-list.component.css']
})
export class PlayTerminListComponent implements OnInit {

  message: string;
  plays : Play[] = [];
 
  allowP = true;
  theatreId: number;
  play: Play;

  constructor(public terminService : TerminService, public playService: PlayService, public route: ActivatedRoute) { }

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
}
