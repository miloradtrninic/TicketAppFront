import { Component, OnInit } from '@angular/core';
import {Fanad} from '../../../../model/fanad.model';
import {FanadService} from '../../../../services/fanad.service';

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.css']
})

export class AllAdsComponent implements OnInit {
  ads: Array<Fanad>;
  message: string;
  error: string;
  constructor(public fanadService: FanadService) { }

  ngOnInit() {
    this.fanadService.getAll().subscribe(
      resp => this.ads = resp, error2 => this.error = JSON.stringify(error2)
    );
  }
  assign() {

  }


}
