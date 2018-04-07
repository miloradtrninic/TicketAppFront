import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auditorium-list',
  templateUrl: './auditorium-list.component.html',
  styleUrls: ['./auditorium-list.component.css']
})
export class AuditoriumListComponent implements OnInit {


  
  currentURL='';
  routeCinema = 'http://localhost:4200/auditorium/cinema';
  routeTheatre =  'http://localhost:4200/auditorium/theatre';


  constructor() { }

  currUrl() {
  return this.currentURL=window.location.href;
  }
  
  ngOnInit() {
  }

}
