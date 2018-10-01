import { TestBed, inject } from '@angular/core/testing';

import { GroupResponsesService } from './group-responses.service';

describe('GroupResponsesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupResponsesService]
    });
  });

  it('should be created', inject([GroupResponsesService], (service: GroupResponsesService) => {
    expect(service).toBeTruthy();
  }));
});
