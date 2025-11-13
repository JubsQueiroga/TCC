import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Biologia } from './biologia';

describe('Biologia', () => {
  let component: Biologia;
  let fixture: ComponentFixture<Biologia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Biologia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Biologia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
