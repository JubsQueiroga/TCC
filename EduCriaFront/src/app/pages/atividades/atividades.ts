import { Component, OnInit } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Disciplina {
  id: string;
  nome: string;
  nota: number;
  progresso: number;
  atividades: number;
  status: string;
  relatorio: string;
  mostrarRelatorio: boolean;
}

interface DisciplinaOption {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-atividades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atividades.html',
  styleUrls: ['./atividades.css']
})
export class Atividades implements OnInit {
  // Filtros
  periodoSelecionado: string = 'mes';
  disciplinaSelecionada: string = 'todas';

  // Opções de disciplinas para o select
  disciplinas: DisciplinaOption[] = [
    { id: 'todas', nome: 'Todas as Disciplinas' },
    { id: 'matematica', nome: 'Matemática' },
    { id: 'historia', nome: 'História' },
    { id: 'portugues', nome: 'Português' },
    { id: 'ciencias', nome: 'Ciências' }
  ];

  // Dados de resumo
  mediaGeral: number = 8.4;
  totalAtividades: number = 45;
  presenca: number = 95;
  diasPresentes: number = 19;
  diasTotais: number = 20;
  progressoGeral: number = 84;

  // Dados das disciplinas
  dadosDisciplinas: Disciplina[] = [
    {
      id: 'matematica',
      nome: 'Matemática',
      nota: 8.5,
      progresso: 85,
      atividades: 12,
      status: 'Ótimo',
      relatorio: 'Você possui um bom desempenho em matemática e é capaz de resolver problemas de maneira rápida e precisa. Sua maior dificuldade está em raciocínios mais abstratos, como álgebra. Recomenda-se continuar praticando esses conteúdos para aprimorar ainda mais sua compreensão.',
      mostrarRelatorio: false
    },
    {
      id: 'historia',
      nome: 'História',
      nota: 9.2,
      progresso: 92,
      atividades: 10,
      status: 'Excelente',
      relatorio: 'Você tem se destacado em história, mostrando grande facilidade em compreender a cronologia dos fatos históricos. Seu desempenho nas avaliações é excelente e sua capacidade de argumentação é cada vez mais consistente.',
      mostrarRelatorio: false
    },
    {
      id: 'portugues',
      nome: 'Português',
      nota: 7.8,
      progresso: 78,
      atividades: 15,
      status: 'Bom',
      relatorio: 'Você demonstra bom domínio da língua portuguesa, mostrando progresso em sua capacidade de leitura e interpretação de textos. No entanto, precisa melhorar a escrita em relação à estruturação de parágrafos e coesão textual. Recomenda-se mais prática na produção de textos.',
      mostrarRelatorio: false
    },
    {
      id: 'ciencias',
      nome: 'Ciências',
      nota: 8.0,
      progresso: 80,
      atividades: 8,
      status: 'Ótimo',
      relatorio: 'Seu desempenho em ciências é consistente, demonstrando boa compreensão dos conceitos básicos. Continue explorando experimentos práticos para fortalecer ainda mais seu aprendizado.',
      mostrarRelatorio: false
    }
  ];

  // Disciplinas filtradas (que serão exibidas)
  disciplinasFiltradas: Disciplina[] = [];

  // Recomendações
  recomendacoes: string[] = [
    'Continue praticando álgebra para fortalecer ainda mais suas habilidades em matemática',
    'Foque na produção de textos para melhorar o desempenho em português',
    'Excelente trabalho em história! Mantenha esse ritmo',
    'Explore mais experimentos práticos em ciências para consolidar o aprendizado'
  ];

  constructor(private location: Location, private router: Router) {}

  abrirAtividadesDisciplina(disciplinaId: string) {
    // mapeamento simples entre id interno e rotas existentes
    const map: any = {
      matematica: 'matematica',
      historia: 'historia',
      portugues: 'linguagens',
      ciencias: 'biologia'
    };
    const rota = map[disciplinaId] || disciplinaId;
    this.router.navigate([`/${rota}`]);
  }

  ngOnInit() {
    this.aplicarFiltros();
  }

  voltar() {
    this.location.back();
  }

  aplicarFiltros() {
    // Filtrar disciplinas baseado na seleção
    if (this.disciplinaSelecionada === 'todas') {
      this.disciplinasFiltradas = [...this.dadosDisciplinas];
    } else {
      this.disciplinasFiltradas = this.dadosDisciplinas.filter(
        disc => disc.id === this.disciplinaSelecionada
      );
    }

    // Aqui você pode adicionar lógica adicional baseada no período selecionado
    // Por exemplo, buscar dados diferentes do backend dependendo do período
    this.atualizarDadosPorPeriodo();
  }

  atualizarDadosPorPeriodo() {
    // Simula mudança de dados baseado no período
    // Em produção, aqui você faria uma chamada ao backend
    switch (this.periodoSelecionado) {
      case 'semana':
        this.totalAtividades = 12;
        break;
      case 'mes':
        this.totalAtividades = 45;
        break;
      case 'trimestre':
        this.totalAtividades = 120;
        break;
      case 'ano':
        this.totalAtividades = 450;
        break;
    }
  }

  toggleRelatorio(disciplina: Disciplina) {
    disciplina.mostrarRelatorio = !disciplina.mostrarRelatorio;
  }

  getClasseStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Excelente': 'excelente',
      'Ótimo': 'otimo',
      'Bom': 'bom',
      'Regular': 'regular'
    };
    return statusMap[status] || 'regular';
  }
}