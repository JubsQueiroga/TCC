import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-geografia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './geografia.html',
  styleUrls: ['./geografia.css']
})
export class Geografia {
  
  progresso: number = 0;
  
  resposta1: string = '';
  resposta2: string = '';
  resposta3: string = '';
  
  feedback1: string = '';
  feedback2: string = '';
  feedback3: string = '';

  respostasCorretas = {
    1: ['semiárido', 'semi-árido', 'semi arido', 'tropical'],
    2: ['baixa altitude', 'terrenos planos', 'planície', 'planicies'],
    3: ['biodiversidade', 'clima', 'oxigênio', 'oxigenio', 'meio ambiente']
  };

  goBack(): void {
    window.history.back();
  }

  verificarResposta(numero: number): void {
    let resposta = '';
    
    switch(numero) {
      case 1:
        resposta = this.resposta1.toLowerCase().trim();
        if (this.respostasCorretas[1].some(r => resposta.includes(r))) {
          this.feedback1 = '✓ Correto! O clima semiárido é predominante no Nordeste.';
          this.atualizarProgresso();
        } else {
          this.feedback1 = '✗ Incorreto. Tente novamente!';
        }
        break;
        
      case 2:
        resposta = this.resposta2.toLowerCase().trim();
        if (this.respostasCorretas[2].some(r => resposta.includes(r))) {
          this.feedback2 = '✓ Correto! Planícies são caracterizadas por baixa altitude e terrenos planos.';
          this.atualizarProgresso();
        } else {
          this.feedback2 = '✗ Incorreto. Tente novamente!';
        }
        break;
        
      case 3:
        resposta = this.resposta3.toLowerCase().trim();
        if (this.respostasCorretas[3].some(r => resposta.includes(r))) {
          this.feedback3 = '✓ Correto! O desmatamento afeta biodiversidade, clima e diversos aspectos ambientais.';
          this.atualizarProgresso();
        } else {
          this.feedback3 = '✗ Incorreto. Tente novamente!';
        }
        break;
    }
  }

  atualizarProgresso(): void {
    let corretas = 0;
    if (this.feedback1.includes('✓')) corretas++;
    if (this.feedback2.includes('✓')) corretas++;
    if (this.feedback3.includes('✓')) corretas++;
    
    this.progresso = Math.round((corretas / 3) * 100);
  }
}