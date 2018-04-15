import { Component, OnInit, Input } from '@angular/core';
import { Theatre } from '../../model/theatre.model';
import {Router, ActivatedRoute} from '@angular/router';
import { TheatreService } from '../../services/theatre.service';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {



  @Input() theatre: Theatre;
  message: string;
  id: number;
  theatres : Theatre[] = [];




  constructor(public theatreService: TheatreService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(window.location.href);
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
       this.theatreService.getOne(this.id).subscribe(
        (resp: Theatre) => {
          this.theatre = resp;
        }, error => {
          this.message = error;
        }
      );
   });
   console.log(window.location.href);
  }




 
}
