import { Component, OnInit, Output } from '@angular/core';
import { Theatre } from '../../../model/theatre.model';
import { TheatreService } from '../../../services/theatre.service';

@Component({
  selector: 'app-theatre-list',
  templateUrl: './theatre-list.component.html',
  styleUrls: ['./theatre-list.component.css']
})
export class TheatreListComponent implements OnInit {

  detailTheatre = -1;
  @Output()  selected: Theatre;
  message: string;
  theatres : Theatre[] = [];

  constructor(public theatreService: TheatreService) { }

  ngOnInit() {
    console.log('ngOnInit theatre list');
    this.theatreService.getAll().subscribe(
      (resp: Theatre[]) => {
        this.theatres = resp;
      }, error => {
        this.message = error;
      }
    );
  }
  deleteTheatre(index){
    console.log('delete theatre');
    this.theatreService.delete(index).subscribe(
      resp => {
        this.theatres.splice(index, 1);
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }


  onDetail(index: number)  {
    this.detailTheatre = index;
  }

  offDetail()  {
    this.detailTheatre = -1;
  }

}
