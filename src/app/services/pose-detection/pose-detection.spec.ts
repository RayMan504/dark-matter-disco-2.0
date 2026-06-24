import { TestBed } from '@angular/core/testing';

import { PoseDetection } from './pose-detection';

describe('PoseDetection', () => {
  let service: PoseDetection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoseDetection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
