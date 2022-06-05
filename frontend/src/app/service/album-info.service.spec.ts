import { TestBed } from '@angular/core/testing';

import { AlbumInfoService } from './album-info.service';

describe('AlbumInfoService', () => {
  let service: AlbumInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
