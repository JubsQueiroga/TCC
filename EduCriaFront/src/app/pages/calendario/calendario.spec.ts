import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Calendario } from './calendario';

describe('Calendario', () => {
  let component: Calendario;
  let fixture: ComponentFixture<Calendario>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Calendario],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Calendario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with November 2024', () => {
    expect(component.mesAtual).toBe(10);
    expect(component.anoAtual).toBe(2024);
    expect(component.nomeMes).toBe('novembro');
  });

  it('should generate calendar with 42 days', () => {
    expect(component.diasCalendario.length).toBe(42);
  });

  it('should navigate to home when voltarParaHome is called', () => {
    component.voltarParaHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should go to previous month', () => {
    component.mesAnterior();
    expect(component.mesAtual).toBe(9); // Outubro
    expect(component.nomeMes).toBe('outubro');
  });

  it('should go to next month', () => {
    component.proximoMes();
    expect(component.mesAtual).toBe(11); // Dezembro
    expect(component.nomeMes).toBe('dezembro');
  });

  it('should handle year transition when going to previous month from January', () => {
    component.mesAtual = 0;
    component.anoAtual = 2024;
    component.mesAnterior();
    expect(component.mesAtual).toBe(11);
    expect(component.anoAtual).toBe(2023);
  });

  it('should handle year transition when going to next month from December', () => {
    component.mesAtual = 11;
    component.anoAtual = 2024;
    component.proximoMes();
    expect(component.mesAtual).toBe(0);
    expect(component.anoAtual).toBe(2025);
  });

  it('should have 7 days of the week', () => {
    expect(component.diasSemana.length).toBe(7);
  });

  it('should log message when adicionarProgramacao is called', () => {
    spyOn(console, 'log');
    component.adicionarProgramacao();
    expect(console.log).toHaveBeenCalledWith('Adicionar programação');
  });
});