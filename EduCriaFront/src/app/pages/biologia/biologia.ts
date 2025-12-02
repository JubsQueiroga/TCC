import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Progresso } from '../../services/progresso';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-biologia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './biologia.html',
  styleUrls: ['./biologia.css']
})
export class Biologia {
  
  progresso: number = 0;
  
  resposta1: string = '';
  resposta2: string = '';
  resposta3: string = '';
  resposta4: string = '';
  
  feedback1: string = '';
  feedback2: string = '';
  feedback3: string = '';
  feedback4: string = '';

  respostasCorretas = {
    1: ['célula', 'celula'],
    2: ['fotossíntese', 'fotossintese'],
    3: ['dna', 'ácido desoxirribonucleico', 'acido desoxirribonucleico'],
    4: ['heterótrofos', 'heterotrofos', 'consumidores']
  };

  constructor(private progressoService: Progresso, private auth: AuthService) {}

  goBack(): void {
    window.history.back();
  }

  verificarResposta(numero: number): void {
    let resposta = '';
    
    switch(numero) {
      case 1:
        resposta = this.resposta1.toLowerCase().trim();
        if (this.respostasCorretas[1].some(r => resposta.includes(r))) {
          this.feedback1 = '✓ Correto! A célula é a menor unidade dos seres vivos.';
          this.atualizarProgresso();
        } else {
          this.feedback1 = '✗ Incorreto. Tente novamente!';
        }
        break;
        
      case 2:
        resposta = this.resposta2.toLowerCase().trim();
        if (this.respostasCorretas[2].some(r => resposta.includes(r))) {
          this.feedback2 = '✓ Correto! A fotossíntese é o processo de produção de alimento pelas plantas.';
          this.atualizarProgresso();
        } else {
          this.feedback2 = '✗ Incorreto. Tente novamente!';
        }
        break;
        
      case 3:
        resposta = this.resposta3.toLowerCase().trim();
        if (this.respostasCorretas[3].some(r => resposta.includes(r))) {
          this.feedback3 = '✓ Correto! O DNA carrega toda a informação genética.';
          this.atualizarProgresso();
        } else {
          this.feedback3 = '✗ Incorreto. Tente novamente!';
        }
        break;
        
      case 4:
        resposta = this.resposta4.toLowerCase().trim();
        if (this.respostasCorretas[4].some(r => resposta.includes(r))) {
          this.feedback4 = '✓ Correto! Heterótrofos ou consumidores se alimentam de outros seres.';
          this.atualizarProgresso();
        } else {
          this.feedback4 = '✗ Incorreto. Tente novamente!';
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
    
    this.progresso = Math.round((corretas / 4) * 100);

    const userId = this.auth.getUsuarioId();
    if (userId) {
      const payload = { usuario_id: userId, materia: 'Biologia', progresso: this.progresso, pontos: Math.round(this.progresso), faltas: 0, boletim: null };
      this.progressoService.salvar(payload).subscribe({ next: () => console.log('Progresso biologia salvo'), error: (e) => console.error('Erro salvar biologia:', e) });
    }
  }

  salvarProgress(): void {
    const userId = this.auth.getUsuarioId();
    if (!userId) return alert('Faça login para salvar seu progresso.');

    const payload = { usuario_id: userId, materia: 'Biologia', progresso: this.progresso, pontos: Math.round(this.progresso), faltas: 0, boletim: null };
    this.progressoService.salvar(payload).subscribe({ next: () => alert('Progresso salvo com sucesso!'), error: () => alert('Erro ao salvar progresso') });
  }
}