import { Component, OnInit } from '@angular/core';
import { Play } from '../../../model/play.model';
import { PlayService } from '../../../services/play.service';
import { ActivatedRoute } from '@angular/router';

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

}
