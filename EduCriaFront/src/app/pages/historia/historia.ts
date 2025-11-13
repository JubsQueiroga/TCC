import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historia.html',
  styleUrls: ['./historia.css']
})
export class Historia {
  
  progresso: number = 0;
  
  resposta1: string = '';
  resposta2: string = '';
  resposta3: string = '';
  resposta4: string = '';
  resposta5: string = '';
  
  feedback1: string = '';
  feedback2: string = '';
  feedback3: string = '';
  feedback4: string = '';
  feedback5: string = '';

  respostasCorretas = {
    1: ['1822'],
    2: ['ditadura militar', 'ditadura', 'regime militar'],
    3: ['gandhi', 'mahatma gandhi'],
    4: ['príncipe real', 'principe real', 'nao sei'], // Aceita "não sei" como resposta válida
    5: ['1945']
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
          this.feedback1 = '✓ Correto! O Brasil proclamou sua independência em 7 de setembro de 1822.';
          this.atualizarProgresso();
        } else {
          this.feedback1 = '✗ Incorreto. Tente novamente!';
        }
        break;
        
      case 2:
        resposta = this.resposta2.toLowerCase().trim();
        if (this.respostasCorretas[2].some(r => resposta.includes(r))) {
          this.feedback2 = '✓ Correto! Foi o período da Ditadura Militar no Brasil.';
          this.atualizarProgresso();
        } else {
          this.feedback2 = '✗ Incorreto. Tente novamente!';
        }
        break;
        
      case 3:
        resposta = this.resposta3.toLowerCase().trim();
        if (this.respostasCorretas[3].some(r => resposta.includes(r))) {
          this.feedback3 = '✓ Correto! Mahatma Gandhi liderou o movimento pela independência da Índia.';
          this.atualizarProgresso();
        } else {
          this.feedback3 = '✗ Incorreto. Tente novamente!';
        }
        break;
        case 4:
        resposta = this.resposta4.toLowerCase().trim();
        if (this.respostasCorretas[4].some(r => resposta.includes(r))) {
          this.feedback4 = '✓ Correto! O navio Príncipe Real trouxe a família real ao Brasil.';
          this.atualizarProgresso();
        } else {
          this.feedback4 = '✗ Incorreto. Dica: O nome do navio tinha relação com a realeza.';
        }
        break;
        
      case 5:
        resposta = this.resposta5.toLowerCase().trim();
        if (this.respostasCorretas[5].some(r => resposta.includes(r))) {
          this.feedback5 = '✓ Correto! A Segunda Guerra Mundial terminou em 1945.';
          this.atualizarProgresso();
        } else {
          this.feedback5 = '✗ Incorreto. Tente novamente!';
        }
        break;
    }
  }

  atualizarProgresso(): void {
    let corretas = 0;
    if (this.feedback1.includes('✓')) corretas++;
    if (this.feedback2.includes('✓')) corretas++;
    if (this.feedback3.includes('✓')) corretas++;
    if (this.feedback4.includes('✓')) corretas++;
    if (this.feedback5.includes('✓')) corretas++;
    
    this.progresso = Math.round((corretas / 5) * 100);
  }
}
