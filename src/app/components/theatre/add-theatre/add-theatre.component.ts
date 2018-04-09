import { Component, OnInit , Input} from '@angular/core';
import {Router} from '@angular/router';
import { Theatre } from '../../../model/theatre.model';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css']
})
export class AddTheatreComponent implements OnInit {

  detailTheatre = -1;
  name = '';
  address = '';
  description = '';
  poster = '';
  allowP = false;
  @Input() theatre: Theatre;

  constructor() { }


  ngOnInit() {
  }


  onDetail(index: number)  {
    this.detailTheatre = index;
  }


  offDetail()  {
    this.detailTheatre = -1;
  }


  allowPreview() {
    this.allowP = true;
  }

  
}
