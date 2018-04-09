import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { Cinema } from '../../../model/cinema.model';


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
  allowP = false;
  detailCinema = -1;
  @Input() cinema: Cinema;
  constructor() { }

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

}
