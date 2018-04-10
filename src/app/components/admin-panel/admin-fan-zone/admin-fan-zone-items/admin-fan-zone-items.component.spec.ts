import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFanZoneItemsComponent } from './admin-fan-zone-items.component';

describe('AdminFanZoneItemsComponent', () => {
  let component: AdminFanZoneItemsComponent;
  let fixture: ComponentFixture<AdminFanZoneItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFanZoneItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFanZoneItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
