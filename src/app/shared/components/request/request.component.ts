import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Constants} from '../../constants/constants';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  public types = Constants.RequestType;
  @Input() public type: string;
  @Input() public requestText: string;
  @Input() acceptClickEvent;
  @Input() declineClickEvent;


  constructor() { }

  ngOnInit() {
  }

  accept(event) {
    this.acceptClickEvent();
  }

  decline(event) {
    this.declineClickEvent();
  }
}
