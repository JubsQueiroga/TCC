import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Geografia } from './geografia';

describe('Geografia', () => {
  let component: Geografia;
  let fixture: ComponentFixture<Geografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Geografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Geografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
