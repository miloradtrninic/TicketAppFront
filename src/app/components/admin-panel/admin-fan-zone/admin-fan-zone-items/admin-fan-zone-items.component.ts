import { Component, OnInit } from '@angular/core';
import {Projection} from '../../../../model/projection.model';
import {Fanzone} from '../../../../model/fanzone.model';
import {FanzoneService} from '../../../../services/fanzone.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-fan-zone-items',
  templateUrl: './admin-fan-zone-items.component.html',
  styleUrls: ['./admin-fan-zone-items.component.css']
})
export class AdminFanZoneItemsComponent implements OnInit {
  fanZone: Fanzone;
  projections: Array<Projection>;
  id: number;
  message: string;
  constructor(public fanZoneService: FanzoneService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.fanZoneService.getOne(this.id).subscribe(
        (resp: Fanzone) => {
          this.fanZone = resp;
        }, error => {
          this.message = error;
        }
      );
    });
  }

}
