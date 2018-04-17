import {Component, OnInit, ViewChild} from '@angular/core';
import {FanzoneService} from '../../../services/fanzone.service';
import {Fanzone} from '../../../model/fanzone.model';
import {User} from '../../../model/user.model';
import {Auditorium} from '../../../model/auditorium.model';
import {NgForm} from '@angular/forms';
import {FanzoneCreation} from '../../../model/creation/fanzone-creation.model';
import {UserService} from '../../../services/user.service';
import {AuditoriumService} from '../../../services/auditorium.service';

@Component({
  selector: 'app-admin-fan-zone',
  templateUrl: './admin-fan-zone.component.html',
  styleUrls: ['./admin-fan-zone.component.css']
})
export class AdminFanZoneComponent implements OnInit {
  fanZones: Array<Fanzone>;
  error: string;
  newAdmin: User;
  admins: Array<User>;
  adminsSelected: Array<User>;
  auditoriums: Array<Auditorium>;
  selected: Fanzone;
  @ViewChild('f') form: NgForm;
  constructor(public fanzoneService: FanzoneService, public userService: UserService, public auditoriumService: AuditoriumService) {
    this.fanZones = new Array();
  }
  ngOnInit() {
    this.fanzoneService.getAll().subscribe(
      resp => this.fanZones = resp, error => this.error = error
    );
  }

  select(selected: Fanzone) {
    this.selected = selected;
  }
  delete(selected: Fanzone) {
    this.fanzoneService.delete(selected.id).subscribe(
      resp => {
        const i = this.fanZones.indexOf(selected);
        if (i !== -1) {
          this.fanZones.splice(i, 1);
        }
      }, error2 => {this.error = error2}
    );
  }
  add() {
    this.auditoriumService.getAll().subscribe(
      resp => this.auditoriums = resp, error => this.error = error
    );
    this.userService.getByRole('ADMIN_FAN').subscribe(
      resp => this.admins = resp, error => this.error = error
    );
  }
  insertNew() {
    const newFanzone = new FanzoneCreation(this.adminsSelected.map(admin => admin.id), this.form.value['auditorium']);
    this.fanzoneService.insert(newFanzone).subscribe(
        resp => this.fanZones.push(resp), error2 => this.error = error2
    );
  }
  removeAdmin(i: number) {
    this.adminsSelected.splice(i, 1);
  }
  addAdmin() {
    this.adminsSelected.push(this.newAdmin);
    this.newAdmin = undefined;
  }
  hasAdmin(id) {
    return this.adminsSelected.map(adm => adm.id).indexOf(id) !== -1;
  }
}
