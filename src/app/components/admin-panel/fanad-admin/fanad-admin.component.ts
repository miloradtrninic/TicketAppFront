import { Component, OnInit } from '@angular/core';
import {Fanad} from '../../../model/fanad.model';

@Component({
  selector: 'app-fanad-admin',
  templateUrl: './fanad-admin.component.html',
  styleUrls: ['./fanad-admin.component.css']
})
export class FanadAdminComponent implements OnInit {
  ads: Array<Fanad>;
  constructor() { }

  ngOnInit() {
  }

}
