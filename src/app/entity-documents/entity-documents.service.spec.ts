import { TestBed } from '@angular/core/testing';

import { EntityDocumentsService } from './entity-documents.service';

describe('EntityDocumentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntityDocumentsService = TestBed.get(EntityDocumentsService);
    expect(service).toBeTruthy();
  });
});
