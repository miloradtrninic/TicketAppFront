import { Component, OnInit, Output } from '@angular/core';
import { Cinema } from '../../../model/cinema.model';
import { CinemaService } from '../../../services/cinema.service';

@Component({
  selector: 'app-cinema-list',
  templateUrl: './cinema-list.component.html',
  styleUrls: ['./cinema-list.component.css']
})
export class CinemaListComponent implements OnInit {

  detailCinema = -1;
  @Output() selected: Cinema;
  message: string;
  cinemas : Cinema[] = [];


  constructor(public cinemaService: CinemaService) { }

  
  ngOnInit() {
    console.log('ngOnInit cinema list');
    this.cinemaService.getAll().subscribe(
      (resp: Cinema[]) => {
        this.cinemas = resp;
      }, error => {
        this.message = error;
      }
    );
  }
  deleteCinema(index){
    console.log('delete cinema');
    this.cinemaService.delete(index).subscribe(
      resp => {
        this.cinemas.splice(index, 1);
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }

  updateCinema(index) {
    
  }

  onDetail(index: number)  {
    this.detailCinema = index;
  }

  offDetail()  {
    this.detailCinema = -1;
  }

}
