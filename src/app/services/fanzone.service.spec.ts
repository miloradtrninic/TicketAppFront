import { TestBed, inject } from '@angular/core/testing';

import { FanzoneServiceService } from './fanzone.service';

describe('FanzoneServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FanzoneServiceService]
    });
  });

  it('should be created', inject([FanzoneServiceService], (service: FanzoneServiceService) => {
    expect(service).toBeTruthy();
  }));
});
