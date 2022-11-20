import { TestBed } from '@angular/core/testing';

import { FffInterceptor } from './fff.interceptor';

describe('FffInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FffInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FffInterceptor = TestBed.inject(FffInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
