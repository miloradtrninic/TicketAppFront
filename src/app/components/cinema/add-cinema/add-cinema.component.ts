import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cinema } from '../../../model/cinema.model';
import { NgForm } from '@angular/forms';
import { CinemaService } from '../../../services/cinema.service';


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
  @ViewChild('addForm') form: NgForm;
  constructor(public cinemaService: CinemaService) { }

  ngOnInit() {
  }

  allowPreview() {
    this.allowP = true;
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
    console.log('add');
    const cinema: Cinema = new Cinema(null, this.form.value['name'], this.form.value['address'],
            this.form.value['description'], 0, null, this.form.value['poster']);
    this.cinemaService.insert(cinema).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }

}
