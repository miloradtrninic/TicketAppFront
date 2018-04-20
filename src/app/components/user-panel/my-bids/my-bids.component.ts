import {Component, OnInit, ViewChild} from '@angular/core';
import {BidService} from '../../../services/bid.service';
import {MyBid} from '../../../model/my-bid.model';
import {NgForm} from '@angular/forms';
import {Bid} from '../../../model/bid.model';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.css']
})
export class MyBidsComponent implements OnInit {
  myBids: MyBid[];
  error: string;
  message: string;
  selected: MyBid;
  @ViewChild('f') form: NgForm;
  constructor(public bidService: BidService) { }

  ngOnInit() {
    this.bidService.getMyBids().subscribe(
      resp => this.myBids = resp, error2 => this.error = JSON.stringify(error2)
    );
  }
  changeBid() {
    if (this.selected !== undefined) {
      const bid = new Bid(this.selected.id, this.selected.fromUserUsername, this.form.value['offer'], this.selected.offerDate);
      this.bidService.update(bid).subscribe(
        (resp: Bid) => this.selected.offer = resp.offer, error2 => this.error = JSON.stringify(error2)
      );
    }
  }

}
