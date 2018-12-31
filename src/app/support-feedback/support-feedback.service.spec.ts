import { TestBed } from '@angular/core/testing';

import { SupportFeedbackService } from './support-feedback.service';

describe('SupportFeedbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupportFeedbackService = TestBed.get(SupportFeedbackService);
    expect(service).toBeTruthy();
  });
});
