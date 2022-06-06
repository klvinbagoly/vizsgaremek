import { TestBed } from '@angular/core/testing';

import { ArtistInfoQuestionService } from './artist-info-question.service';

describe('ArtistInfoQuestionService', () => {
  let service: ArtistInfoQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistInfoQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
