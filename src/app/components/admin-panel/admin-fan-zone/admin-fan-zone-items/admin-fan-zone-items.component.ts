import {Component, OnInit, ViewChild} from '@angular/core';
import {Projection} from '../../../../model/projection.model';
import {Fanzone} from '../../../../model/fanzone.model';
import {FanzoneService} from '../../../../services/fanzone.service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {FanItemService} from '../../../../services/fan-item.service';
import {Fanitem} from '../../../../model/fanitem.model';

@Component({
  selector: 'app-admin-fan-zone-items',
  templateUrl: './admin-fan-zone-items.component.html',
  styleUrls: ['./admin-fan-zone-items.component.css']
})
export class AdminFanZoneItemsComponent implements OnInit {
  fanZone: Fanzone;
  id: number;
  message: string;
  error: string;
  fanItemImage: File;
  selectedItem: Fanitem;
  @ViewChild('f') uploadForm: NgForm;
  constructor(public fanZoneService: FanzoneService, public fanItemService: FanItemService,
              private route: ActivatedRoute) {
    this.selectedItem = undefined;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.fanZoneService.getOne(this.id).subscribe(
        (resp: Fanzone) => {
          this.fanZone = resp;
        }, error => {
          this.error = JSON.stringify(error);
        }
      );
    });
  }
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.fanItemImage = fileList[0];
    }
  }
  select(item: Fanitem) {
    this.selectedItem = item;
    this.uploadForm.controls['name'].setValue(this.selectedItem.name);
    this.uploadForm.controls['description'].setValue(this.selectedItem.description);
  }
  delete(item: Fanitem, index) {
    this.fanItemService.delete(item.id).subscribe(resp => {
      this.message = 'Item deleted';
      this.fanZone.fanitemList.splice(index, 1);
    }, error2 => this.error = JSON.stringify(error2));
  }
  send() {
    const formData: FormData = new FormData();
    if (this.selectedItem === undefined) {
      formData.append('image', this.fanItemImage, this.fanItemImage.name);
      formData.append('name', this.uploadForm.value['name']);
      formData.append('description', this.uploadForm.value['description']);
      formData.append('fanzoneId', this.fanZone.id + '');
      this.fanItemService.uploadImage(formData).subscribe(
        resp => {
          this.fanZone.fanitemList.push(resp);
          this.message = 'Item added.';
          this.uploadForm.resetForm();
          this.fanItemImage = undefined;
        }, error2 => this.error = JSON.stringify(error2)
      );
    } else {
      formData.append('name', this.uploadForm.value['name']);
      formData.append('description', this.uploadForm.value['description']);
      formData.append('description', this.selectedItem.id + '');
      if (this.fanItemImage !== undefined) {
        formData.append('image', this.fanItemImage, this.fanItemImage.name);
      }
      this.fanItemService.updateItem(formData).subscribe(
        resp => {
          this.message = 'Item updated.';
          this.uploadForm.resetForm();
          this.fanItemImage = undefined;
          this.selectedItem = undefined;
        }, error2 => this.error = JSON.stringify(error2)
      );
    }
  }

}
