import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanZoneComponent } from './fan-zone.component';

describe('FanZoneComponent', () => {
  let component: FanZoneComponent;
  let fixture: ComponentFixture<FanZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
