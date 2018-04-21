import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TopLevelComponent} from '../top-level/top-level.component';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {ListItem} from '../../shared/model/list-item';
import {Constants} from '../../shared/constants/constants';
import {HelperFunctions} from '../../shared/util/helper-functions';
import {AuditoriumService} from '../../services/auditorium.service';
import {AuditoriumPreview} from '../../model/preview/auditorium-preview';
import {Token} from '../../model/token.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends TopLevelComponent implements OnInit {

  private dummyItems = [];
  private userAuthenticated: boolean;
  private errormsg: string;
  selectedCinema = false;
  selectedTheatre = false;
  private visits: AuditoriumPreview[];

  private readonly type = Constants.ListType.COMMON;

  constructor(protected service: UserService, protected router: Router, private auditServ: AuditoriumService) {
    super(service, router, null);
  }

  ngOnInit() {
    super.ngOnInit();
    const token: Token = this.service.getToken();
    this.userAuthenticated = token !== null;
    this.dummyItems = HelperFunctions.createDummyTest(null);

    if (this.userAuthenticated) {
      this.service.getVisited()
        .subscribe(res => {
          this.visits = res;
        }, err => {
          this.errormsg = err;
        });
    }
  }

  getAuditoriumListItems() {
    return HelperFunctions.createListItems(this.visits, null, ['name']);
  }

  goToPage(auditorium: AuditoriumPreview) {
    const type = auditorium.entity_type;

    if (type === Constants.AuditoriumType.CINEMA) {
      this.router.navigate([]);
    } else if (type === Constants.AuditoriumType.THEATRE) {
      this.router.navigate([]);
    } else {
      this.errormsg = 'Something went wrong while redirecting you to selected page.';
    }
  }

  itemClicked(item) {
    console.log(item);
  }

  selectTheatre() {
    this.selectedTheatre = true;
  }

  selectCinema() {
    this.selectedCinema = true;
  }

}
