import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fisica } from './fisica';

describe('Fisica', () => {
  let component: Fisica;
  let fixture: ComponentFixture<Fisica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fisica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fisica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
