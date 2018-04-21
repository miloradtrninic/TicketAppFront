import { Component, OnInit } from '@angular/core';
import {Fanitem} from '../../model/fanitem.model';
import {FanItemService} from '../../services/fan-item.service';
import {ActivatedRoute} from '@angular/router';
import {FanzoneService} from '../../services/fanzone.service';
import {Fanzone} from '../../model/fanzone.model';

@Component({
  selector: 'app-fan-zone',
  templateUrl: './fan-zone.component.html',
  styleUrls: ['./fan-zone.component.css']
})
export class FanZoneComponent implements OnInit {
  fanZone: Fanzone;
  audId: number;
  error2: any;
  constructor(public fanitemService: FanItemService, public fanZoneService: FanzoneService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.audId = +params['id'];
        this.fanZoneService.getOne(this.audId).subscribe(
          resp => this.fanZone = resp, error2 => this.error2 = error2
        );
      }
    );
  }
  reserve(item: Fanitem) {
  }

}
