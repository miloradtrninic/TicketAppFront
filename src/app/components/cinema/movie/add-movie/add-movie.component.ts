import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MovieService } from '../../../../services/movie.service';
import { Movie } from '../../../../model/movie.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {


  name = '';
  address = '';
  description = '';
  poster = '';
  duration = '';
  director = '';
  message: string;
  allowP = true;
  detailMovie = -1;
  @Input() movie: Movie;
  @ViewChild('addForm') form: NgForm;

  constructor(public movieService: MovieService) { }

  ngOnInit() {
  }

  allowPreview() {
    this.allowP = true;
  }

  onDetail(index: number)  {
    this.detailMovie = index;
  }

  offDetail()  {
    this.detailMovie = -1;
  }

  allowPreview1() {
    this.allowP = false;
  }
  allowPreview2() {
    this.allowP = true;  
  }

  add() {
    console.log('add movie');
    const movie: Movie = new Movie(null, this.form.value['name'], null ,this.form.value['director'], 
            this.form.value['duration'], this.form.value['poster'], this.form.value['description'] );
    this.movieService.insert(movie).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }

}
