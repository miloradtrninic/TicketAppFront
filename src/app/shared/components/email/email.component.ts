import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css', '../styles/styles.css']
})
export class EmailComponent implements OnInit {
  @Input() id:string;
  @Input() name:string;
  text:string = null;
  error:boolean;

  constructor() { }

  ngOnInit() {
  }

  onKeyUp(e):void {

  }
}
