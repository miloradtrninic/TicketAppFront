import {Component, OnInit, ViewChild} from '@angular/core';
import {FanadService} from '../../../services/fanad.service';
import {Fanad} from '../../../model/fanad.model';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {BidService} from '../../../services/bid.service';
import {BidCreation} from '../../../model/creation/bid-creation.model';

@Component({
  selector: 'app-fan-ads',
  templateUrl: './fan-ads.component.html',
  styleUrls: ['./fan-ads.component.css']
})
export class FanAdsComponent implements OnInit {
  fanAds: Array<Fanad>;
  selected: Fanad;
  fanZoneId: number;
  error: string;
  message: string;
  fanAdImage: File;
  @ViewChild('fBid') bidForm: NgForm;
  @ViewChild('f') uploadForm: NgForm;
  constructor(public fanAdsService: FanadService, private bidService: BidService, public route: ActivatedRoute) {
    this.fanAds = new Array();
  }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.fanZoneId = +params['id'];
      this.fanAdsService.getAllByZone(this.fanZoneId).subscribe(
        (resp: Fanad[]) => {
          if (resp !== null && resp.length > 0) {
            this.fanAds = resp;
          }
        }, error => {
          this.error = JSON.stringify(error);
        }
      );
    });
  }
  newAd() {
    const formData: FormData = new FormData();
    formData.append('image', this.fanAdImage, this.fanAdImage.name);
    formData.append('name', this.uploadForm.value['name']);
    formData.append('description', this.uploadForm.value['description']);
    formData.append('expirationDate', this.uploadForm.value['expirationDate']);
    formData.append('fanzoneId', this.fanZoneId + '');
    console.log(this.uploadForm.value['expirationDate']);
    this.fanAdsService.uploadImage(formData).subscribe(
      resp => {
        this.fanAds.push(resp);
        this.message = 'Item added.';
        this.uploadForm.resetForm();
        this.fanAdImage = undefined;
      }, error2 => this.error = JSON.stringify(error2)
    );
  }
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.fanAdImage = fileList[0];
    }
  }
  makeBid() {
    console.log('make bid');
    console.log(this.selected.id);
    const newBid = new BidCreation(this.bidForm.value['offer'], this.selected.id);
    this.bidService.insert(newBid).subscribe(
      resp => this.message = 'Bid successfully placed.', error2 => this.error = JSON.stringify(error2)
    );
  }
}
