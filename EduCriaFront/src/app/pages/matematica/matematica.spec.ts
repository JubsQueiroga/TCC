import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Matematica } from './matematica';

describe('Matematica', () => {
  let component: Matematica;
  let fixture: ComponentFixture<Matematica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Matematica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Matematica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
