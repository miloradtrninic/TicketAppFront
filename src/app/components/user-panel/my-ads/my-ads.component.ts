import { Component, OnInit } from '@angular/core';
import {Fanad} from '../../../model/fanad.model';
import {FanadService} from '../../../services/fanad.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {
  myAds: Array<Fanad>;
  error: string;
  message: string;
  selected: Fanad;
  constructor(public fanAdService: FanadService) { }

  ngOnInit() {
    this.fanAdService.getMyAds().subscribe(
      resp => this.myAds = resp, error2 => this.error = JSON.stringify(error2)
    );
  }
  select(id: number) {
    this.fanAdService.getOne(id).subscribe(
      resp => this.selected = resp, error2 => this.error = JSON.stringify(error2)
    );
  }
  acceptBid(id: number) {
    this.fanAdService.acceptBid(id).subscribe(
      resp => this.selected = resp, error2 => this.error = JSON.stringify(error2)
    );
  }
}
