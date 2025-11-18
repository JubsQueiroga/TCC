import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilJogos } from './perfil-jogos';

describe('PerfilJogos', () => {
  let component: PerfilJogos;
  let fixture: ComponentFixture<PerfilJogos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilJogos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilJogos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
