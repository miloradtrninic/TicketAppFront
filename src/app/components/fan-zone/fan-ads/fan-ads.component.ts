import { Component, OnInit } from '@angular/core';
import {FanadService} from '../../../services/fanad.service';
import {Fanad} from '../../../model/fanad.model';

@Component({
  selector: 'app-fan-ads',
  templateUrl: './fan-ads.component.html',
  styleUrls: ['./fan-ads.component.css']
})
export class FanAdsComponent implements OnInit {
  fanAds: Array<Fanad>;
  selected: Fanad;
  constructor(public fanAdsService: FanadService) { }

  ngOnInit() {
  }

}
