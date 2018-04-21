import { Component, OnInit } from '@angular/core';
import {InvitationService} from '../../services/invitation.service';
import {Invitation} from '../../model/invitation.model';
import {InvitationPreview} from '../../model/preview/invitation-preview';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  private msg: string;
  private items: Invitation[];

  constructor(private invService: InvitationService) {
  }

  ngOnInit() {
    this.invService.getInvitationsForUser()
      .subscribe(res => {
        this.items = res;
      }, err => {
        this.msg = err;
      });
  }

  accept(invitation: Invitation) {
    this.invService.acceptInvitation(invitation.id)
      .subscribe(res => {
        this.msg = res;
        this.items.splice(this.items.indexOf(invitation), 1);
      }, err => {
        this.msg = err;
      });
  }

  decline(invitation: Invitation) {
    this.invService.declineInvitation(invitation.id)
      .subscribe(res => {
        this.msg = res;
        this.items.splice(this.items.indexOf(invitation), 1);
      }, err => {
        this.msg = err;
      });
  }

}
