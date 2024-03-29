import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

}
