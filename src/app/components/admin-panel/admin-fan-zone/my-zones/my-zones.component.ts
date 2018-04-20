import { Component, OnInit } from '@angular/core';
import {FanzoneService} from '../../../../services/fanzone.service';
import {Fanzone} from '../../../../model/fanzone.model';

@Component({
  selector: 'app-my-zones',
  templateUrl: './my-zones.component.html',
  styleUrls: ['./my-zones.component.css']
})
export class MyZonesComponent implements OnInit {
  error;
  message;
  fanZones: Array<Fanzone>;
  constructor(public fanZoneService: FanzoneService) { }

  ngOnInit() {
    this.fanZoneService.getMyZones()
      .subscribe(resp => this.fanZones = resp,
        error2 => this.error = JSON.stringify(error2))
  }

}
