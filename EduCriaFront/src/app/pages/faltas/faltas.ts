// ============================================================
// 📁 ARQUIVO: faltas.ts
// ============================================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faltas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faltas.html',
  styleUrls: ['./faltas.css']
})
export class Faltas {
  
  // ============================================================
  // 📊 DADOS DAS MATÉRIAS (Aqui você coloca os dados do aluno)
  // ============================================================
  dados = [
    { 
      materia: 'Matemática',    // Nome da matéria
      faltas: 3,                // Quantas faltas o aluno tem
      limiteTotal: 15           // Limite máximo permitido
    },
    { 
      materia: 'Português', 
      faltas: 1, 
      limiteTotal: 15 
    },
    { 
      materia: 'História', 
      faltas: 7, 
      limiteTotal: 15 
    },
    { 
      materia: 'Geografia', 
      faltas: 2, 
      limiteTotal: 15 
    },
    { 
      materia: 'Física', 
      faltas: 5, 
      limiteTotal: 15 
    },
    { 
      materia: 'Química', 
      faltas: 4, 
      limiteTotal: 15 
    }
  ];

  // ============================================================
  // 🔧 FUNÇÕES (Lógica do componente)
  // ============================================================

  // Calcula o total de faltas somando todas as matérias
  get totalFaltas(): number {
    return this.dados.reduce((acc, item) => acc + item.faltas, 0);
  }

  // Calcula a porcentagem de faltas em relação ao limite
  calcularPorcentagem(faltas: number, limite: number): number {
    return Math.round((faltas / limite) * 100);
  }

  // Define a cor baseado no nível de faltas
  getCorBarra(faltas: number, limite: number): string {
    const porcentagem = (faltas / limite) * 100;
    if (porcentagem >= 75) return '#ef4444'; // Vermelho
    if (porcentagem >= 50) return '#f59e0b'; // Laranja
    return '#10b981'; // Verde
  }

  // Verifica se está no limite crítico (75% ou mais)
  estaNoLimite(faltas: number, limite: number): boolean {
    return faltas >= limite * 0.75;
  }

  // Retorna o maior valor de faltas (para definir escala do gráfico)
  get maxFaltas(): number {
    return Math.max(...this.dados.map(d => d.limiteTotal));
  }
}
