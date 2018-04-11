import { TestBed, inject } from '@angular/core/testing';

import { SentecesService } from './senteces.service';

describe('SentecesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SentecesService]
    });
  });

  it('should be created', inject([SentecesService], (service: SentecesService) => {
    expect(service).toBeTruthy();
  }));
});
