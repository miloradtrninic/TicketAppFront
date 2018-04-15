import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {HelperFunctions} from '../../util/helper-functions';
import {Constants} from '../../constants/constants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private listType = Constants.ListType;
  private requestType = Constants.RequestType;
  @Output() onElementClickEvent: EventEmitter<any> = new EventEmitter();
  @Input() public header: string;
  @Input() public items: Array<string>;
  @Input() public type: string;

  constructor() { }

  ngOnInit() {}

  elementClicked(event) {
    this.onElementClickEvent.emit(event);
  }
}
