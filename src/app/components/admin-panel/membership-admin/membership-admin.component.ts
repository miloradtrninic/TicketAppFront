import {Component, OnInit, ViewChild} from '@angular/core';
import {Membership} from '../../../model/membership.model';
import {MembershipService} from '../../../services/membership.service';
import {NgForm} from '@angular/forms';
import {MembershipCreation} from '../../../model/creation/membership-creation.model';

@Component({
  selector: 'app-membership-admin',
  templateUrl: './membership-admin.component.html',
  styleUrls: ['./membership-admin.component.css']
})
export class MembershipAdminComponent implements OnInit {
  memberships: Array<Membership>;
  error: string;
  message: string;
  selected: Membership;
  @ViewChild('fNew') formNew: NgForm;
  @ViewChild('fEdit') formEdit: NgForm;
  constructor(private memberShipService: MembershipService) { }

  ngOnInit() {
    this.memberShipService.getAll().subscribe(
      resp => this.memberships = resp, error2 => this.error = JSON.stringify(error2)
    );
  }
  addNew() {
    const membership: MembershipCreation = new MembershipCreation(this.formNew.value['name'],
      this.formNew.value['points'], this.formNew.value['discount'] );
    this.memberShipService.insert(membership).subscribe(
      resp => this.memberships.push(resp), error2 => this.error = JSON.stringify(error2)
    );
  }

  delete(membership: Membership, index: number) {
    this.memberShipService.delete(membership.id).subscribe(
      resp => this.memberships.splice(index, 1), error2 => this.error = JSON.stringify(error2)
    );
  }
  editMember(mem: Membership) {
    this.message = undefined;
    this.selected = mem;
    this.formEdit.controls['ePoints'].setValue(mem.points);
    this.formEdit.controls['eDiscount'].setValue(mem.discount);
  }
  editMemberSubmit() {
    this.memberShipService.update({'id': this.selected.id, 'points':  this.formEdit.value['ePoints'],
    'discount': this.formEdit.value['eDiscount']}).subscribe(
      resp => {
        const index = this.memberships.map(mem => mem.id).indexOf(resp.id);
        this.memberships[index] = resp;
        this.message = 'Updated!';
      }, error2 => this.error = JSON.stringify(error2)
    );
  }
}
