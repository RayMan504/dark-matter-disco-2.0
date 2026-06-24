import { TestBed } from '@angular/core/testing';

import { PixiGraphics } from './pixi-graphics';

describe('PixiGraphics', () => {
  let service: PixiGraphics;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PixiGraphics);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
