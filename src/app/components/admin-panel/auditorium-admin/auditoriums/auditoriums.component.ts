import { Component, OnInit } from '@angular/core';
import {Auditorium} from '../../../../model/auditorium.model';
import {AuditoriumService} from '../../../../services/auditorium.service';
import {User} from '../../../../model/user.model';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-auditoriums',
  templateUrl: './auditoriums.component.html',
  styleUrls: ['./auditoriums.component.css']
})
export class AuditoriumsAdminComponent implements OnInit {
  auditoriums: Array<Auditorium>;
  error: string;
  message: string;
  admins: Array<User>;
  adminsSelected: Array<User>;
  selected: Auditorium;
  newAdmin: User;
  constructor(public auditoriumService: AuditoriumService, public userService: UserService) { }

  ngOnInit() {
    this.auditoriumService
      .getAll()
      .subscribe(resp => this.auditoriums = resp, error2 => this.error = JSON.stringify(error2));
    this.userService.getByRole('ADMIN_AUD').subscribe(
      resp => this.admins = resp, error => this.error = error
    );
  }
  selectAud(aud: Auditorium) {
    this.selected = aud;
    this.auditoriumService.getAuditoriumAdmins(aud.id)
      .subscribe(resp => this.adminsSelected = resp, error2 => this.error = JSON.stringify(error2));
  }
  removeAdmin(i: number) {
    this.adminsSelected.splice(i, 1);
  }
  addAdmin() {
    this.adminsSelected.push(this.newAdmin);
    this.newAdmin = undefined;
  }
  hasAdmin(id) {
    if (this.adminsSelected === undefined) {
      return false;
    }
    return this.adminsSelected.map(adm => adm.id).indexOf(id) !== -1;
  }
  update() {
    this.auditoriumService.updateAdmins({'id': this.selected.id, 'adminFKs': this.adminsSelected.map(adm => adm.id)})
      .subscribe(resp => this.message = 'Updated!', error2 => this.error = JSON.stringify(error2));
  }
  removeAud(id: number, index: number) {
    this.auditoriumService.delete(id).subscribe(
      resp => this.auditoriums.splice(index, 1), error2 => this.error = JSON.stringify(error2)
    );
  }
}
