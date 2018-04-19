import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Theatre } from '../../../model/theatre.model';
import { TheatreService } from '../../../services/theatre.service';
import { NgForm } from '@angular/forms';
import {HelperFunctions} from '../../../shared/util/helper-functions';
import { TheatreUpdate } from '../../../model/update/theatre-update.model';

@Component({
  selector: 'app-theatre-list',
  templateUrl: './theatre-list.component.html',
  styleUrls: ['./theatre-list.component.css']
})
export class TheatreListComponent implements OnInit {

  name = '';
  address = '';
  description = '';
  poster = '';

  allowP = true;
  detailTheatre = -1;
  @Output()  selected: Theatre;
  message: string;
  theatres : Theatre[] = [];

  @ViewChild('editForm') form: NgForm;

  constructor(public theatreService: TheatreService) { }

  ngOnInit() {
    console.log('edit theatre');
    const theatreUpdate : TheatreUpdate = new TheatreUpdate(this.selected.id,this.form.value['name'], 
    this.form.value['address'],  this.form.value['description'], 0);
    this.theatreService.update(theatreUpdate).subscribe(
      resp => {
    const idx = this.theatres.map(cin => cin.id).findIndex(id => id === resp.id);
    this.theatres[idx] = resp;
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }

  fillFields(selected){
    this.name = selected.name;
    this.address = selected.address;
    this.description = selected.description;
    this.poster = selected.poster;
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

  editTheatre(index){
    console.log('edit theatre');
    console.log('broj indexa je : ' + index);
    this.theatreService.update(index).subscribe(
      resp => {
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

  allowPreview1() {
    this.allowP = false;
  }

  allowPreview2() {
    this.allowP = true;
  }

  sortByName() {
    this.theatres = HelperFunctions.sortArrayByKey(this.theatres, 'name');
  }

  sortByAddress() {
    this.theatres = HelperFunctions.sortArrayByKey(this.theatres, 'address');
  }

  sortByRatings() {
    this.theatres = HelperFunctions.sortArrayByKey(this.theatres, 'ratings');
  }
}
