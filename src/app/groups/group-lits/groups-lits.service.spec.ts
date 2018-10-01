import { TestBed, inject } from '@angular/core/testing';

import { GroupsLitsService } from './groups-lits.service';

describe('GroupsLitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupsLitsService]
    });
  });

  it('should be created', inject([GroupsLitsService], (service: GroupsLitsService) => {
    expect(service).toBeTruthy();
  }));
});
