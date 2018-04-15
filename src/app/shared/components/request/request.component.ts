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
  @Input() relatedItem: any;

  constructor() { }

  ngOnInit() {
  }

  accept(event) {
    if (this.relatedItem == null) {
      this.acceptClickEvent(0);
    } else {
      this.acceptClickEvent(this.relatedItem);
    }
  }

  decline(event) {
    if (this.relatedItem == null) {
      this.declineClickEvent(0);
    } else {
      this.declineClickEvent(this.relatedItem);
    }
  }
}
