import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dancer } from './dancer';

describe('Dancer', () => {
  let component: Dancer;
  let fixture: ComponentFixture<Dancer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dancer],
    }).compileComponents();

    fixture = TestBed.createComponent(Dancer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
