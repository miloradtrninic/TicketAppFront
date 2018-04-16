import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HelperFunctions} from './shared/util/helper-functions';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  @Input()
  private isUserAuthenticated: boolean;

  constructor(private auth: AuthService) {
    this.isUserAuthenticated = !HelperFunctions.containsEmptyValues(this.auth.getToken());

    auth.isLoggedIn()
      .subscribe(tok => {
        console.log(tok);
        this.isUserAuthenticated = tok;
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Pozvan!');
    for (let prop in changes) {
      let chng = changes[prop];
      let cur = JSON.stringify(chng.currentValue);
      let old = JSON.stringify(chng.previousValue);
      console.log(cur);
      console.log(old);
    }
  }
}
