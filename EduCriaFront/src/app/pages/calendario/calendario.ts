import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


interface DiaCalendario {
  dia: number;
  mes: number;
  ano: number;
  mesAtual: boolean;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './calendario.html',
  styleUrls: ['./calendario.css']
})
export class Calendario implements OnInit {
  mesAtual: number = 10; // Novembro (0-11, então 10 = novembro)
  anoAtual: number = 2024;
  nomeMes: string = '';
  diasSemana: string[] = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
  diasCalendario: DiaCalendario[] = [];
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.gerarCalendario();
  }

  voltarParaHome(): void {
    this.router.navigate(['/home']);
  }

  gerarCalendario(): void {
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    
    this.nomeMes = meses[this.mesAtual];
    
    // Primeiro dia do mês
    const primeiroDia = new Date(this.anoAtual, this.mesAtual, 1);
    const diaSemanaInicio = primeiroDia.getDay();
    
    // Último dia do mês
    const ultimoDia = new Date(this.anoAtual, this.mesAtual + 1, 0);
    const totalDiasMes = ultimoDia.getDate();
    
    // Último dia do mês anterior
    const ultimoDiaMesAnterior = new Date(this.anoAtual, this.mesAtual, 0).getDate();
    
    this.diasCalendario = [];
    
    // Dias do mês anterior
    for (let i = diaSemanaInicio - 1; i >= 0; i--) {
      this.diasCalendario.push({
        dia: ultimoDiaMesAnterior - i,
        mes: this.mesAtual - 1,
        ano: this.anoAtual,
        mesAtual: false
      });
    }
    
    // Dias do mês atual
    for (let dia = 1; dia <= totalDiasMes; dia++) {
      this.diasCalendario.push({
        dia: dia,
        mes: this.mesAtual,
        ano: this.anoAtual,
        mesAtual: true
      });
    }
    
    // Dias do próximo mês para completar a grade
    const diasRestantes = 42 - this.diasCalendario.length; // 6 semanas x 7 dias
    for (let dia = 1; dia <= diasRestantes; dia++) {
      this.diasCalendario.push({
        dia: dia,
        mes: this.mesAtual + 1,
        ano: this.anoAtual,
        mesAtual: false
      });
    }
  }

  adicionarProgramacao(): void {
    this.router.navigate(['/noticias']);
  }

  mesAnterior(): void {
    if (this.mesAtual === 0) {
      this.mesAtual = 11;
      this.anoAtual--;
    } else {
      this.mesAtual--;
    }
    this.gerarCalendario();
  }

  proximoMes(): void {
    if (this.mesAtual === 11) {
      this.mesAtual = 0;
      this.anoAtual++;
    } else {
      this.mesAtual++;
    }
    this.gerarCalendario();
  }
  
}