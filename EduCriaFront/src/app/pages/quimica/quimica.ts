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
  selector: 'app-quimica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quimica.html',
  styleUrls: ['./quimica.css']
})
export class Quimica {
  
  titulo = 'Química';
  subtitulo = 'Reações e Transformações';

  atividades: Atividade[] = [
    {
      numero: 1,
      titulo: 'Atividade 1:',
      enunciado: 'Qual é o número atômico do Carbono?',
      resposta: '6',
      respostaUsuario: '',
      verificada: false,
      correta: null,
      dica: 'O Carbono é essencial para a vida e tem símbolo C'
    },
    {
      numero: 2,
      titulo: 'Atividade 2:',
      enunciado: 'Quantos átomos de Hidrogênio existem em uma molécula de água (H₂O)?',
      resposta: '2',
      respostaUsuario: '',
      verificada: false,
      correta: null,
      dica: 'Observe o índice subscrito após o H'
    },
    {
      numero: 3,
      titulo: 'Atividade 3:',
      enunciado: 'Qual é a fórmula química do sal de cozinha? (use letras maiúsculas e minúsculas corretas)',
      resposta: 'NaCl',
      respostaUsuario: '',
      verificada: false,
      correta: null,
      dica: 'É formado por Sódio e Cloro'
    },
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
    
    const respostaLimpa = atividade.respostaUsuario.trim();
    const respostaCorreta = atividade.resposta.trim();
    
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
