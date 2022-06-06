import { TestBed } from '@angular/core/testing';

import { ArtistQuestionService } from './artist-question.service';

describe('ArtistQuestionService', () => {
  let service: ArtistQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
