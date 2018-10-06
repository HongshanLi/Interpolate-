import { TestBed, inject } from '@angular/core/testing';

import { GroupLitThreadsMgmtService } from './group-lit-threads-mgmt.service';

describe('GroupLitThreadsMgmtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupLitThreadsMgmtService]
    });
  });

  it('should be created', inject([GroupLitThreadsMgmtService], (service: GroupLitThreadsMgmtService) => {
    expect(service).toBeTruthy();
  }));
});
