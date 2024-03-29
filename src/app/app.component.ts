import {Component, Input, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import {HelperFunctions} from './shared/util/helper-functions';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input()
  private isUserAuthenticated: boolean;

  constructor(private auth: AuthService) {
    this.isUserAuthenticated = !HelperFunctions.containsEmptyValues(this.auth.getToken());
  }
  ngOnInit() {
    this.isUserAuthenticated = this.auth.isLoggedInSimple();
  }
}
