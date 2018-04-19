import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FanadService} from '../../../../services/fanad.service';
import {Fanad} from '../../../../model/fanad.model';
import {BidCreation} from '../../../../model/creation/bid-creation.model';
import {NgForm} from '@angular/forms';
import {BidService} from '../../../../services/bid.service';

@Component({
  selector: 'app-single-ad',
  templateUrl: './single-ad.component.html',
  styleUrls: ['./single-ad.component.css']
})
export class SingleAdComponent implements OnInit {
  adId: number;
  ad: Fanad;
  message: string;
  error: string;
  @ViewChild('f') bidForm: NgForm;
  constructor(private route: ActivatedRoute, public adService: FanadService, private bidService: BidService) { }
  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.adId = +param['adId'];
        this.adService.getOne(this.adId).subscribe(
          resp => this.ad = resp, error2 => this.error = JSON.stringify(error2)
        );
      }, error2 => this.error = JSON.stringify(error2)
    );
  }
  makeBid() {
    const newBid = new BidCreation(this.bidForm.value['offer'], this.adId);
    this.bidService.insert(newBid).subscribe(
      resp => this.message = 'Bid successfully placed.', error2 => this.error = JSON.stringify(error2)
    );
  }

}
