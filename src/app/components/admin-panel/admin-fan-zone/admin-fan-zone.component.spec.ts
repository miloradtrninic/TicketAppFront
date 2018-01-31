import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFanZoneComponent } from './admin-fan-zone.component';

describe('AdminFanZoneComponent', () => {
  let component: AdminFanZoneComponent;
  let fixture: ComponentFixture<AdminFanZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFanZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFanZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
