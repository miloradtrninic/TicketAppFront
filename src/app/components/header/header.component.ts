import {Component, Input, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  private authenticated: boolean;
  @Input()
  private isAdmin: boolean;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  logout(event) {
    this.auth.logout();
  }
}
