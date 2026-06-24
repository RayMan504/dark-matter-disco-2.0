import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceFloor } from './dance-floor';

describe('DanceFloor', () => {
  let component: DanceFloor;
  let fixture: ComponentFixture<DanceFloor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanceFloor],
    }).compileComponents();

    fixture = TestBed.createComponent(DanceFloor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
