import { TestBed } from '@angular/core/testing';

import { TagQuestionService } from './tag-question.service';

describe('TagQuestionService', () => {
  let service: TagQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
