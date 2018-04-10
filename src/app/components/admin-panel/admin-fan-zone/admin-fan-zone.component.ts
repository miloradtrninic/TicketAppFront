import {Component, OnInit, ViewChild} from '@angular/core';
import {FanzoneService} from '../../../services/fanzone.service';
import {Fanzone} from '../../../model/fanzone.model';
import {User} from '../../../model/user.model';
import {Auditorium} from '../../../model/auditorium.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-fan-zone',
  templateUrl: './admin-fan-zone.component.html',
  styleUrls: ['./admin-fan-zone.component.css']
})
export class AdminFanZoneComponent implements OnInit {
  fanZones: Array<Fanzone>;
  error: string;
  admins: Array<User>;
  auditoriums: Array<Auditorium>;
  selected: Fanzone;
  @ViewChild('f') form: NgForm;
  constructor(public fanzoneService: FanzoneService) {
    this.fanZones = new Array();
  }
  ngOnInit() {
    this.fanzoneService.getAll().subscribe(
      resp => this.fanZones = resp, error => this.error = error
    );
  }

  select(selected: Fanzone) {
    this.selected = selected;
    if (selected !== undefined) {
      this.form.controls['admin'].setValue(this.selected.admin);
      this.form.controls['auditorium'].setValue(this.selected.auditorium);
      this.form.controls['auditorium'].setValue(this.selected.auditorium);
    }
  }

  add(toAdd: Fanzone) {
    this.fanzoneService.insert(toAdd).subscribe(
      resp => this.fanZones.push(resp), error2 => this.error = error2
    );
  }
  edit(selected: Fanzone) {
    this.fanzoneService.update(selected).subscribe(
      resp => selected = resp, error2 => {this.error = error2}
    );
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
  submitForm() {
    if (this.selected === undefined) {
      const newFanzone = new Fanzone(null, this.form.value['admin'], null, this.form.value['auditorium']);
      this.fanzoneService.insert(newFanzone).subscribe(
        resp => this.fanZones.push(resp), error2 => this.error = error2
      );
    } else {
      const editZone = new Fanzone(this.selected.id, this.form.value['admin'], this.selected.fanitemList, this.form.value['auditorium'])
      this.fanzoneService.update(editZone).subscribe(
        resp => this.selected = resp, error2 => this.error = error2
      );
    }
  }
  userId(u1: User, u2: User): boolean {
    if (u1 && u2) {
      return u1.username === u2.username;
    }
    return false;
  }
  audId(a1: Auditorium, a2: Auditorium) {
    if (a1 && a2) {
      return a1.id === a2.id;
    }
    return false;
  }
}
