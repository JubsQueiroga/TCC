import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Progresso } from '../../services/progresso';
import { AuthService } from '../../shared/auth.service';

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
  selector: 'app-fisica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fisica.html',
  styleUrls: ['./fisica.css']
})
export class Fisica {
  
  titulo = 'Física';
  subtitulo = 'Movimento e Forças';

  atividades: Atividade[] = [
    {
      numero: 1,
      titulo: 'Atividade 1:',
      enunciado: 'Um carro parte do repouso e atinge 20 m/s em 5 s. Qual é a aceleração média? (responda em m/s²)',
      resposta: '4',
      respostaUsuario: '',
      verificada: false,
      correta: null,
      dica: 'Use a fórmula: a = Δv / Δt'
    },
    {
      numero: 2,
      titulo: 'Atividade 2:',
      enunciado: 'Um objeto em queda livre cai de uma altura de 20m. Considerando g = 10 m/s², quanto tempo leva para atingir o solo? (responda em segundos)',
      resposta: '2',
      respostaUsuario: '',
      verificada: false,
      correta: null,
      dica: 'Use: h = g×t²/2'
    },
    {
      numero: 3,
      titulo: 'Atividade 3:',
      enunciado: 'Qual a velocidade final de um corpo que parte do repouso com aceleração de 5 m/s² após 4 segundos? (responda em m/s)',
      resposta: '20',
      respostaUsuario: '',
      verificada: false,
      correta: null,
      dica: 'Use: v = v₀ + a×t (v₀ = 0)'
    },
  ];

  constructor(
    private router: Router,
    private location: Location,
    private progressoService: Progresso,
    private auth: AuthService
  ) {}

  goBack() {
    this.location.back();
  }

  verificarResposta(atividade: Atividade) {
    atividade.verificada = true;
    
    const respostaLimpa = atividade.respostaUsuario.trim().toLowerCase();
    const respostaCorreta = atividade.resposta.trim().toLowerCase();
    
    atividade.correta = respostaLimpa === respostaCorreta;

    // salvar progresso para usuário logado
    const progress = this.calcularProgresso();
    const userId = this.auth.getUsuarioId();
    if (userId) {
      const payload = { usuario_id: userId, materia: 'Física', progresso: progress, pontos: Math.round(progress), faltas: 0, boletim: null };
      this.progressoService.salvar(payload).subscribe({ next: () => console.log('Progresso fisica salvo'), error: (e) => console.error('Erro salvar fisica:', e) });
    }
  }

  salvarProgress() {
    const progress = this.calcularProgresso();
    const userId = this.auth.getUsuarioId();
    if (!userId) return alert('Faça login para salvar seu progresso.');

    const payload = { usuario_id: userId, materia: 'Física', progresso: progress, pontos: Math.round(progress), faltas: 0, boletim: null };
    this.progressoService.salvar(payload).subscribe({ next: () => alert('Progresso salvo com sucesso!'), error: () => alert('Erro ao salvar') });
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
