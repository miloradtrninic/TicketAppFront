import { Component, OnInit } from '@angular/core';
import {Auditorium} from '../../../../model/auditorium.model';

@Component({
  selector: 'app-auditoriums',
  templateUrl: './auditoriums.component.html',
  styleUrls: ['./auditoriums.component.css']
})
export class AuditoriumsAdminComponent implements OnInit {
  auditoriums: Array<Auditorium>;
  constructor() { }

  ngOnInit() {
  }

}
