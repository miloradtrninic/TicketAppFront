import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Output() onElementClickEvent: EventEmitter<any> = new EventEmitter();
  @Input() public header: string;
  @Input() public items: Array<string>;
  constructor() { }

  ngOnInit() {}


  elementClicked(event) {
    this.onElementClickEvent.emit(event);
  }
}
