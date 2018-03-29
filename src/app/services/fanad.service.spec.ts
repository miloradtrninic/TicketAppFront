import { TestBed, inject } from '@angular/core/testing';

import { FanadService } from './fanad.service';

describe('FanadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FanadService]
    });
  });

  it('should be created', inject([FanadService], (service: FanadService) => {
    expect(service).toBeTruthy();
  }));
});
