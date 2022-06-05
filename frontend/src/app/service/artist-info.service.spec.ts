import { TestBed } from '@angular/core/testing';

import { ArtistInfoService } from './artist-info.service';

describe('ArtistInfoService', () => {
  let service: ArtistInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
