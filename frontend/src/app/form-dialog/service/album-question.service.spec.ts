import { TestBed } from '@angular/core/testing';

import { AlbumQuestionService } from './album-question.service';

describe('AlbumQuestionService', () => {
  let service: AlbumQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
