import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Progresso } from './progresso';

describe('Progresso', () => {
  let component: Progresso;
  let fixture: ComponentFixture<Progresso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Progresso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Progresso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
