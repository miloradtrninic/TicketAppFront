import { Component, OnInit, Input } from '@angular/core';
import { TheatreComponent } from '../theatre/theatre.component'
import { CinemaComponent } from '../cinema/cinema.component'
import { Cinema } from '../../model/cinema.model';
import { Theatre } from '../../model/theatre.model';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-auditorium-list',
  templateUrl: './auditorium-list.component.html',
  styleUrls: ['./auditorium-list.component.css']
})
export class AuditoriumListComponent implements OnInit {

  @Input() cinema: HomeComponent;
  @Input() theatre: HomeComponent;

  constructor() { }

  ngOnInit() {
  }

}
