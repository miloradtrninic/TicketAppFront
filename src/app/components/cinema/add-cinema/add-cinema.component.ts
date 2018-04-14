import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Cinema } from '../../../model/cinema.model';
import { NgForm } from '@angular/forms';
import { CinemaService } from '../../../services/cinema.service';
import { CinemaCreation } from '../../../model/creation/cinema-creation.model';


@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
  styleUrls: ['./add-cinema.component.css']
})
export class AddCinemaComponent implements OnInit {

  name = '';
  address = '';
  description = '';
  poster = '';
  allowP = true;
  detailCinema = -1;
  message: string;
  @Input() cinema: Cinema;
  @Output() addedCinema: EventEmitter<any> = new EventEmitter();
  @ViewChild('addForm') form: NgForm;
  constructor(public cinemaService: CinemaService) { }

  ngOnInit() {
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
  add() {
<<<<<<< HEAD
    console.log('add cinema');
    const cinema: CinemaCreation = new CinemaCreation(this.form.value['name'], this.form.value['address'], 
            this.form.value['description'], 0);
=======
    console.log('add');
    const cinema: Cinema = new Cinema(null, this.form.value['name'], this.form.value['address'],
            this.form.value['description'], 0, null, this.form.value['poster']);
>>>>>>> 8a7f8cf6fc7db0f092738c83b042cb1054326737
    this.cinemaService.insert(cinema).subscribe(
      resp => {
        this.addedCinema.emit(resp);
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }
  
}
