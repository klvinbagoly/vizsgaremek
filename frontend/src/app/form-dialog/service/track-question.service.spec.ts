import { TestBed } from '@angular/core/testing';

import { TrackQuestionService } from './track-question.service';

describe('TrackQuestionService', () => {
  let service: TrackQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
