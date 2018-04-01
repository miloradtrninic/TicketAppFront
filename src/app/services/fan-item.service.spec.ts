import { TestBed, inject } from '@angular/core/testing';

import { FanItemService } from './fan-item.service';

describe('FanItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FanItemService]
    });
  });

  it('should be created', inject([FanItemService], (service: FanItemService) => {
    expect(service).toBeTruthy();
  }));
});
