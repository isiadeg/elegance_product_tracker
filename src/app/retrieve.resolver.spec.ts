import { TestBed } from '@angular/core/testing';

import { RetrieveResolver } from './retrieve.resolver';

describe('RetrieveResolver', () => {
  let resolver: RetrieveResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RetrieveResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
