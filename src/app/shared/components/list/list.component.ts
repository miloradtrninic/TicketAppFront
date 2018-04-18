import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {HelperFunctions} from '../../util/helper-functions';
import {Constants} from '../../constants/constants';
import {ListItem} from '../../model/list-item';

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
  @Input() public items: ListItem[];
  @Input() public type: string;

  constructor() {
    console.log(this.items);
  }

  ngOnInit() {}

  elementClicked(item) {
    this.onElementClickEvent.emit(item);
  }
}
