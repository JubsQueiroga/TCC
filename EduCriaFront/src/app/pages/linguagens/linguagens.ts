import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // <-- ADICIONE ESTA LINHA

@Component({
  selector: 'app-linguagens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linguagens.html',
  styleUrls: ['./linguagens.css']
})
export class LinguagensComponent {
  redacao = {
    progresso: 0,
    status: 'COMEÇAR'
  };

  literatura = {
    progresso: 60,
    status: 'CONTINUE'
  };

  constructor(private router: Router) {} // <-- ADICIONE ESTA LINHA

  getProgressClass(progresso: number): string {
    if (progresso === 0) return 'progress-zero';
    if (progresso < 50) return 'progress-low';
    if (progresso < 100) return 'progress-medium';
    return 'progress-high';
  }

  onRedacaoClick(): void {
    this.router.navigate(['/redacao']); // <-- NAVEGAÇÃO PARA REDAÇÃO
  }

  onLiteraturaClick(): void {
    this.router.navigate(['/literatura']); // <-- MUDE PARA ISSO
  }

  onBackClick(): void {
    window.history.back();
  }
}