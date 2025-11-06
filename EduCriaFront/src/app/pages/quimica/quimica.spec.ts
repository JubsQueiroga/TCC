import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quimica } from './quimica';

describe('Quimica', () => {
  let component: Quimica;
  let fixture: ComponentFixture<Quimica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quimica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Quimica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
