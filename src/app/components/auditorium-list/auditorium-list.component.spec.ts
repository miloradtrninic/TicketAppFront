import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriumListComponent } from './auditorium-list.component';

describe('AuditoriumListComponent', () => {
  let component: AuditoriumListComponent;
  let fixture: ComponentFixture<AuditoriumListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriumListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
