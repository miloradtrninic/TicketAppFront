import { Component, OnInit } from '@angular/core';
import {Fanad} from '../../../../model/fanad.model';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.css']
})

export class AllAdsComponent implements OnInit {
  ads: Array<Fanad>;
  constructor() { }

  ngOnInit() {
  }

}
