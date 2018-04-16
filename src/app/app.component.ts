import { Component } from '@angular/core';
import {HelperFunctions} from './shared/util/helper-functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserAuthenticated = !HelperFunctions.isEmptyValue(window.localStorage.getItem('currentUser') != null);
}
