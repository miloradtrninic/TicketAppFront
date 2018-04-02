import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies : Movie[] = [
    new Movie(1, "The Transporter", 4, "Louis Leterrier", 123, "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/The_transporter.svg/1280px-The_transporter.svg.png", "Description1"),
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
