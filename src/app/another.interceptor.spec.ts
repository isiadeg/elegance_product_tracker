import { TestBed } from '@angular/core/testing';

import { AnotherInterceptor } from './another.interceptor';

describe('AnotherInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AnotherInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AnotherInterceptor = TestBed.inject(AnotherInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
