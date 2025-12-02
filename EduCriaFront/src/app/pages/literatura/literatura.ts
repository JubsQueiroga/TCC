import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Progresso } from '../../services/progresso';
import { AuthService } from '../../shared/auth.service';

interface Questao {
  id: number;
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  respondida: boolean;
  acertou?: boolean;
}

interface Conteudo {
  id: number;
  titulo: string;
  texto: string;
  expandido: boolean;
}

@Component({
  selector: 'app-literatura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './literatura.html',
  styleUrls: ['./literatura.css']
})
export class Literatura {
  abaSelecionada: string = 'conteudo'; // 'conteudo', 'exercicios', 'resumo'
  
  conteudos: Conteudo[] = [
    {
      id: 1,
      titulo: 'Realismo e Naturalismo',
      texto: 'O Realismo surgiu na segunda metade do século XIX como uma reação ao Romantismo. Caracteriza-se pela objetividade, descrição detalhada da realidade e crítica social. Principais autores: Machado de Assis, Eça de Queirós.',
      expandido: false
    },
    {
      id: 2,
      titulo: 'Modernismo Brasileiro',
      texto: 'O Modernismo teve início com a Semana de Arte Moderna de 1922. Buscava romper com o academicismo e valorizar a cultura brasileira. Principais autores: Mário de Andrade, Oswald de Andrade, Carlos Drummond de Andrade.',
      expandido: false
    },
    {
      id: 3,
      titulo: 'Barroco',
      texto: 'O Barroco foi o estilo artístico e literário dominante no século XVII. Caracteriza-se pelo uso de antíteses, paradoxos e linguagem rebuscada. Principal autor: Gregório de Matos.',
      expandido: false
    },
    {
      id: 4,
      titulo: 'Romantismo',
      texto: 'O Romantismo valorizava a emoção, o individualismo e o nacionalismo. No Brasil, teve forte influência indianista. Principais autores: José de Alencar, Castro Alves, Gonçalves Dias.',
      expandido: false
    }
  ];

  questoes: Questao[] = [
    {
      id: 1,
      pergunta: 'Qual autor é considerado o principal representante do Realismo brasileiro?',
      opcoes: ['José de Alencar', 'Machado de Assis', 'Graciliano Ramos', 'Jorge Amado'],
      respostaCorreta: 1,
      respondida: false
    },
    {
      id: 2,
      pergunta: 'A Semana de Arte Moderna aconteceu em que ano?',
      opcoes: ['1920', '1921', '1922', '1923'],
      respostaCorreta: 2,
      respondida: false
    },
    {
      id: 3,
      pergunta: 'Qual movimento literário valorizava a emoção e o individualismo?',
      opcoes: ['Realismo', 'Naturalismo', 'Romantismo', 'Parnasianismo'],
      respostaCorreta: 2,
      respondida: false
    },
    {
      id: 4,
      pergunta: 'Quem foi chamado de "Boca do Inferno" no período Barroco?',
      opcoes: ['Padre Vieira', 'Gregório de Matos', 'Tomás Antônio Gonzaga', 'Claudio Manuel da Costa'],
      respostaCorreta: 1,
      respondida: false
    }
  ];

  resumoTexto: string = '';
  progresso: number = 0;

  constructor(private progressoService: Progresso, private auth: AuthService) {
    this.calcularProgresso();
  }

  onBackClick(): void {
    window.history.back();
  }

  selecionarAba(aba: string): void {
    this.abaSelecionada = aba;
  }

  toggleConteudo(conteudo: Conteudo): void {
    conteudo.expandido = !conteudo.expandido;
  }

  responderQuestao(questao: Questao, opcaoIndex: number): void {
    if (!questao.respondida) {
      questao.respondida = true;
      questao.acertou = opcaoIndex === questao.respostaCorreta;
      this.calcularProgresso();

      const userId = this.auth.getUsuarioId();
      if (userId) {
        const payload = { usuario_id: userId, materia: 'Literatura', progresso: this.progresso, pontos: Math.round(this.progresso), faltas: 0, boletim: null };
        this.progressoService.salvar(payload).subscribe({ next: () => console.log('Progresso literatura salvo'), error: (e) => console.error('Erro salvar literatura:', e) });
      }
    }
  }

  salvarProgress(): void {
    const userId = this.auth.getUsuarioId();
    if (!userId) return alert('Faça login para salvar seu progresso.');

    const payload = { usuario_id: userId, materia: 'Literatura', progresso: this.progresso, pontos: Math.round(this.progresso), faltas: 0, boletim: null };
    this.progressoService.salvar(payload).subscribe({ next: () => alert('Progresso salvo com sucesso!'), error: () => alert('Erro ao salvar progresso') });
  }

  calcularProgresso(): void {
    const totalQuestoes = this.questoes.length;
    const questoesRespondidas = this.questoes.filter(q => q.respondida && q.acertou).length;
    this.progresso = Math.round((questoesRespondidas / totalQuestoes) * 100);
  }

  salvarResumo(): void {
    console.log('Resumo salvo:', this.resumoTexto);
    alert('Resumo salvo com sucesso!');
  }

  reiniciarExercicios(): void {
    this.questoes.forEach(q => {
      q.respondida = false;
      q.acertou = undefined;
    });
    this.calcularProgresso();
  }
}
