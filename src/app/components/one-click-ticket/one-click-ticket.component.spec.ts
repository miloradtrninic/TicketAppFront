import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneClickTicketComponent } from './one-click-ticket.component';

describe('OneClickTicketComponent', () => {
  let component: OneClickTicketComponent;
  let fixture: ComponentFixture<OneClickTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneClickTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneClickTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
