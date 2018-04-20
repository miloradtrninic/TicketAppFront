import { Component, OnInit, Output,ViewChild } from '@angular/core';
import { Cinema } from '../../../model/cinema.model';
import { CinemaService } from '../../../services/cinema.service';
import { NgForm } from '@angular/forms';
import {HelperFunctions} from '../../../shared/util/helper-functions';
import { CinemaUpdate } from '../../../model/update/cinema-update.model';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-cinema-list',
  templateUrl: './cinema-list.component.html',
  styleUrls: ['./cinema-list.component.css']
})
export class CinemaListComponent implements OnInit {

  name = '';
  address = '';
  description = '';
  poster = '';

  allowP = true;
  detailCinema = -1;
  @Output() selected: Cinema;
  message: string;
  cinemas: Cinema[] = [];

  @ViewChild('editForm') form: NgForm;

  constructor(public cinemaService: CinemaService, public authService: AuthService) { }


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
  fillFields(selected){
    this.name = selected.name;
    this.address = selected.address;
    this.description = selected.description;
    this.poster = selected.poster;
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
  editCinema(index){
    console.log('edit cinema');
    console.log('broj indexa je : ' + index);
    const cinemaUpdate : CinemaUpdate = new CinemaUpdate(this.selected.id, this.form.value['name'],
    this.form.value['address'],  this.form.value['description'], 0);
    this.cinemaService.update(cinemaUpdate).subscribe(
      resp => {
    const idx = this.cinemas.map(cin => cin.id).findIndex(id => id === resp.id);
    this.cinemas[idx] = resp;
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }
  onDetail(index: number)  {
    this.detailCinema = index;
  }

  offDetail()  {
    this.detailCinema = -1;
  }

  allowPreview1() {
    this.allowP = false;
  }

  allowPreview2() {
    this.allowP = true;
  }

  sortByName() {
    this.cinemas = HelperFunctions.sortArrayByKey(this.cinemas, 'name');
  }

  sortByAddress() {
    this.cinemas = HelperFunctions.sortArrayByKey(this.cinemas, 'address');
  }

  sortByRatings() {
    this.cinemas = HelperFunctions.sortArrayByKey(this.cinemas, 'ratings');
  }
  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }
}
