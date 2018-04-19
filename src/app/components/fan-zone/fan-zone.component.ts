import { Component, OnInit } from '@angular/core';
import {Fanitem} from '../../model/fanitem.model';
import {FanItemService} from '../../services/fan-item.service';
import {ActivatedRoute} from '@angular/router';
import {FanzoneService} from '../../services/fanzone.service';

@Component({
  selector: 'app-fan-zone',
  templateUrl: './fan-zone.component.html',
  styleUrls: ['./fan-zone.component.css']
})
export class FanZoneComponent implements OnInit {
  fanItems: Array<Fanitem>;
  audId: number;
  error2: any;
  constructor(public fanitemService: FanItemService, public fanZoneService: FanzoneService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.audId = +params['id'];
        this.fanZoneService.getOne(this.audId).subscribe(
          resp => this.fanItems = resp, error2 => this.error2 = error2
        );
      }
    );
  }
  reserve(item: Fanitem) {
  }

}
