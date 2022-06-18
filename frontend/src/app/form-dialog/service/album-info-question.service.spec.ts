import { TestBed } from '@angular/core/testing';

import { AlbumInfoQuestionService } from './album-info-question.service';

describe('AlbumInfoQuestionService', () => {
  let service: AlbumInfoQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumInfoQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
