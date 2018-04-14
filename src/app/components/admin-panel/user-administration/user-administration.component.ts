import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/user.model';
import {UserRole} from '../../../model/user-role.model';
import {UserRoleService} from '../../../services/user-role.service';


@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.css']
})
export class UserAdministrationComponent implements OnInit {
  users: Array<User>;
  message: string;
  selected: User;
  error: string;
  newRole: UserRole;
  roles: Array<UserRole>;
  constructor(public userService: UserService, public userRolesService: UserRoleService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      resp => this.users = resp, error => this.message = JSON.stringify(error)
    );
    this.userRolesService.getAll().subscribe(
      resp => this.roles = resp, error => this.message = JSON.stringify(error)
    );
  }
  editRoles() {
    this.userService.changeRole(this.selected.id, this.selected.userRoles.map(rol => rol.id)).subscribe(
      resp => this.message = 'User promoted', error2 => this.error = JSON.stringify(error2)
    );
  }
  hasRole(id) {
    return this.selected.userRoles.map(rol => rol.id).indexOf(id) !== -1;
  }
  addRole() {
    this.selected.userRoles.push(this.newRole);
    this.newRole = undefined;
  }
  removeRole(role: UserRole) {
    this.selected.userRoles.splice(this.selected.userRoles.indexOf(role), 1);
  }
  ban(user: User) {
    this.userService.ban(user.id).subscribe(
      resp => {
        this.message = 'User is banned';
        user.enabled = false;
      }, error2 => this.error = JSON.stringify(error2)
    );
  }
  activate(user: User) {
    this.userService.activate(user.id).subscribe(
      resp => {
        this.message = 'User is activated';
        user.enabled = true;
      }, error2 => this.error = JSON.stringify(error2)
    );
  }

}
