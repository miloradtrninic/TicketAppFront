import { Component, OnInit , Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Theatre } from '../../../model/theatre.model';
import { NgForm } from '@angular/forms';
import { TheatreService } from '../../../services/theatre.service';
import { TheatreCreation } from '../../../model/creation/theatre-creation.model';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css']
})
export class AddTheatreComponent implements OnInit {

  
  name = '';
  address = '';
  description = '';
  poster = '';
  allowP = true;
  detailTheatre = -1;
  message: string;
  @Input() theatre: Theatre;
  @Output() addedTheatre: EventEmitter<any> = new EventEmitter();
  @ViewChild('addForm') form: NgForm;

 constructor(public theatreService: TheatreService) { }


  ngOnInit() {
  }


  onDetail(index: number)  {
    this.detailTheatre = index;
  }


  offDetail()  {
    this.detailTheatre = -1;
  }


  allowPreview1() {
      this.allowP = false;
  }
  allowPreview2() {
      this.allowP = true;  
  }

  addTheatre() {
    console.log('add theatre');
    const theatre: TheatreCreation = new TheatreCreation(this.form.value['name'], this.form.value['address'], 
            this.form.value['description'], 0);
    this.theatreService.insert(theatre).subscribe(
      resp => {
        this.addedTheatre.emit(resp);
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
    this.name = '';
    this.address = '';
    this.description = '';
    this.poster = '';
  }
  
}
