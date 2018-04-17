import { Component, OnInit } from '@angular/core';
import {FanadService} from '../../../../services/fanad.service';
import {Fanad} from '../../../../model/fanad.model';

@Component({
  selector: 'app-fanad-to-approve',
  templateUrl: './fanad-to-approve.component.html',
  styleUrls: ['./fanad-to-approve.component.css']
})
export class FanadToApproveComponent implements OnInit {
  ads: Array<Fanad>;
  error: string;
  message: string;
  constructor(public fanadService: FanadService) { }

  ngOnInit() {
    this.fanadService.getMyToApprove().subscribe(
      resp => this.ads = resp, error2 => this.error = JSON.stringify(error2)
    );
  }
  approve(selected: Fanad, index: number) {
   this.fanadService.approve(selected).subscribe(
     resp => this.ads.splice(index, 1)
     , error2 => this.error = JSON.stringify(error2)
   )
  }
  disapprove(selected: Fanad, index: number) {
    this.fanadService.approve(selected).subscribe(
      resp => this.ads.splice(index, 1)
      , error2 => this.error = JSON.stringify(error2)
    )
  }

}
