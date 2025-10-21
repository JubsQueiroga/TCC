import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atividades } from './atividades';

describe('Atividades', () => {
  let component: Atividades;
  let fixture: ComponentFixture<Atividades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atividades]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Atividades);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
