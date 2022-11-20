import { TestBed } from '@angular/core/testing';

import { TouseforcountService } from './touseforcount.service';

describe('TouseforcountService', () => {
  let service: TouseforcountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouseforcountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
