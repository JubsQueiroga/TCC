import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Redacao } from './redacao';

describe('Redacao', () => {
  let component: Redacao;
  let fixture: ComponentFixture<Redacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Redacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Redacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
