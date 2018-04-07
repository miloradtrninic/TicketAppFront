import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private dummyItems = [];
  selectedCinema = false;
  selectedTheatre = false;


  constructor() { }

  ngOnInit() {
    this.createDummyTest()
  }

  createDummyTest() {
    for (let i = 0; i < 20; i++) {
      const text = this.makeRandom();
      const item = {
        'id' : i,
        'text' : text,
      };

      this.dummyItems.push(item);
    }
  }

  makeRandom() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  itemClicked(index) {
   alert('Item clicked, with text: ' + this.dummyItems[index]['text']);
  }

  selectTheatre() {
    this.selectedTheatre = true;
  }

  selectCinema() {
    this.selectedCinema = true;
  }
}
