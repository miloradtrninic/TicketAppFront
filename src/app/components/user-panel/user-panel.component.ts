import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  private activeTab: number = null;

  constructor() { }

  ngOnInit() {
  }

  changeActive(event) {
    this.activeTab = event.target.getAttribute('id');
  }

}
