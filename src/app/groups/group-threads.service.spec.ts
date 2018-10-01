import { TestBed, inject } from '@angular/core/testing';

import { GroupThreadsService } from './group-threads.service';

describe('GroupThreadsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupThreadsService]
    });
  });

  it('should be created', inject([GroupThreadsService], (service: GroupThreadsService) => {
    expect(service).toBeTruthy();
  }));
});
