import { Component, OnInit } from '@angular/core';
import { Termin } from '../../../model/termin.model';
import { TerminService } from '../../../services/termin.service';

@Component({
  selector: 'app-movie-termin-list',
  templateUrl: './movie-termin-list.component.html',
  styleUrls: ['./movie-termin-list.component.css']
})
export class MovieTerminListComponent implements OnInit {

  selected : Termin;
  message: string;
  termins : Termin[] = [];
  detailTermin = -1;
  allowP = true;
  
  constructor(public terminService : TerminService) { }

  ngOnInit() {
    this.terminService.getAll().subscribe(
      (resp: Termin[]) => {
        this.termins = resp;
      }, error => {
        this.message = error;
      }
    );

  }

  onDetail(index: number)  {
    this.detailTermin = index;
  }

  offDetail()  {
    this.detailTermin = -1;
  }

  allowPreview1() {
    this.allowP = false;
  }

  allowPreview2() {
    this.allowP = true;  
  }


}
