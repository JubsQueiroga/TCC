import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioJogos } from './inicio-jogos';

describe('InicioJogos', () => {
  let component: InicioJogos;
  let fixture: ComponentFixture<InicioJogos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioJogos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioJogos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
