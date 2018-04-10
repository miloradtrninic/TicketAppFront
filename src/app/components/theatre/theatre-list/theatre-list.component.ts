import { Component, OnInit } from '@angular/core';
import { Theatre } from '../../../model/theatre.model';
import { TheatreService } from '../../../services/theatre.service';

@Component({
  selector: 'app-theatre-list',
  templateUrl: './theatre-list.component.html',
  styleUrls: ['./theatre-list.component.css']
})
export class TheatreListComponent implements OnInit {

  detailTheatre = -1;
  currentURL='';
  click = false;
  selected: Theatre;
  message: string;


  theatres : Theatre[];


  constructor(public theatreService: TheatreService) { }

  ngOnInit() {
    this.theatreService.getAll().subscribe(
      (resp: Theatre[]) => {
        this.theatres = resp;
      }, error => {
        this.message = error;
      }
    );
  }


  onDetail(index: number)  {
    this.detailTheatre = index;
  }

  offDetail()  {
    this.detailTheatre = -1;
  }

  numTheatre() {
    this.currentURL = this.currentURL=window.location.href;
  }
  
}
