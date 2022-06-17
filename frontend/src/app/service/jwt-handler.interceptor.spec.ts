import { TestBed } from '@angular/core/testing';

import { JwtHandlerInterceptor } from './jwt-handler.interceptor';

describe('JwtHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtHandlerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtHandlerInterceptor = TestBed.inject(JwtHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
