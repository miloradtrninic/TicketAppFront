import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FanItemService} from '../../../services/fan-item.service';
import {FanzoneService} from '../../../services/fanzone.service';
import {Fanzone} from '../../../model/fanzone.model';
import {Fanitem} from '../../../model/fanitem.model';

@Component({
  selector: 'app-fan-items',
  templateUrl: './fan-items.component.html',
  styleUrls: ['./fan-items.component.css']
})
export class FanItemsComponent implements OnInit {
  fanZone: Fanzone;
  id: number;
  message: string;
  error: string;
  constructor(public fanZoneService: FanzoneService, public fanItemService: FanItemService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.id = +params['id'];
      this.fanZoneService.getOne(this.id).subscribe(
        (resp: Fanzone) => {
          this.fanZone = resp;
        }, error => {
          this.error = JSON.stringify(error);
        }
      );
    });
  }
  reserve(item: Fanitem) {
    this.fanItemService.reserve(item.id).subscribe(
      resp => {item = resp, this.message = 'Item reserved.'}, error2 => this.error = JSON.stringify(error2)
    )
  }
}
