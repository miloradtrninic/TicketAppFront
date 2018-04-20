import { Component, OnInit } from '@angular/core';
import {Fanitem} from '../../../model/fanitem.model';
import {FanItemService} from '../../../services/fan-item.service';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit {
  error: string;
  message: string;
  myItems: Array<Fanitem>;
  constructor(public fanItemService: FanItemService) { }

  ngOnInit() {
    this.fanItemService.getMyItems().subscribe(
      resp => this.myItems = resp, error2 => this.error = JSON.stringify(error2)
    );
  }

}
