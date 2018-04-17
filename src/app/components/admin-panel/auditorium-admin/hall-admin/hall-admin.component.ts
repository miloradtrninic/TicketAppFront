import { Component, OnInit } from '@angular/core';
import {Hall} from '../../../../model/hall.model';
import {HallService} from '../../../../services/hall.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hall-admin',
  templateUrl: './hall-admin.component.html',
  styleUrls: ['./hall-admin.component.css']
})
export class HallAdminComponent implements OnInit {
  halls: Array<Hall>;
  message: string;
  error: string;
  constructor(private hallService: HallService, public router: Router) { }

  ngOnInit() {
    this.hallService.getAllOfMyAuds().subscribe(resp => this.halls = resp,
        error2 => this.error = JSON.stringify(error2) )
  }
  removeHall(id: number, index: number) {
    this.hallService.delete(id).subscribe(
      resp => {
        this.message = 'Hall removed';
        this.halls.splice(index, 1);
      }, error2 => this.error = JSON.stringify(error2)
    );
  }
}
