import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

interface Atividade {
  numero: number;
  titulo: string;
  enunciado: string;
  resposta: string;
  respostaUsuario: string;
  verificada: boolean;
  correta: boolean | null;
  dica?: string;
}

@Component({
  selector: 'app-matematica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './matematica.html',
  styleUrls: ['./matematica.css']
})
export class Matematica {
  
  titulo = 'Matemática';
  subtitulo = 'Desafios de Lógica e Funções';

  atividades: Atividade[] = [
    {
      numero: 1,
      titulo: 'Atividade 1:',
      enunciado: 'Resolva: se f(x) = 2x + 3, qual é o valor de f(5)?',
      resposta: '13',
      respostaUsuario: '',
      verificada: false,
      correta: null
    },
    {
      numero: 2,
      titulo: 'Atividade 2:',
      enunciado: 'Calcule: 3² + 4² = ?',
      resposta: '25',
      respostaUsuario: '',
      verificada: false,
      correta: null
    },
    {
      numero: 3,
      titulo: 'Atividade 3:',
      enunciado: 'Se x = 5, quanto vale 2x + 10?',
      resposta: '20',
      respostaUsuario: '',
      verificada: false,
      correta: null
    }
  ];

  constructor(
    private router: Router,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }

  verificarResposta(atividade: Atividade) {
    atividade.verificada = true;
    
    const respostaLimpa = atividade.respostaUsuario.trim().toLowerCase();
    const respostaCorreta = atividade.resposta.trim().toLowerCase();
    
    atividade.correta = respostaLimpa === respostaCorreta;
  }

  limparResposta(atividade: Atividade) {
    atividade.respostaUsuario = '';
    atividade.verificada = false;
    atividade.correta = null;
  }

  calcularProgresso(): number {
    const total = this.atividades.length;
    const corretas = this.atividades.filter(a => a.correta === true).length;
    return Math.round((corretas / total) * 100);
  }
}