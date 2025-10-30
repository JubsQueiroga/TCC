<<<<<<< HEAD
// ============================================================
// 📁 ARQUIVO: faltas.ts
// ============================================================
=======
>>>>>>> educria

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
  
<<<<<<< HEAD
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
=======
  // DADOS DAS MATÉRIAS E FALTAS
  dados = [
    { materia: 'Matemática', faltas: 3, limiteTotal: 15 },
    { materia: 'Português', faltas: 1, limiteTotal: 15 },
    { materia: 'História', faltas: 7, limiteTotal: 15 },
    { materia: 'Geografia', faltas: 2, limiteTotal: 15 },
    { materia: 'Física', faltas: 5, limiteTotal: 15 },
    { materia: 'Química', faltas: 4, limiteTotal: 15 }
  ];

  // Calcula o total de faltas
>>>>>>> educria
  get totalFaltas(): number {
    return this.dados.reduce((acc, item) => acc + item.faltas, 0);
  }

<<<<<<< HEAD
  // Calcula a porcentagem de faltas em relação ao limite
=======
  // Calcula a porcentagem
>>>>>>> educria
  calcularPorcentagem(faltas: number, limite: number): number {
    return Math.round((faltas / limite) * 100);
  }

<<<<<<< HEAD
  // Define a cor baseado no nível de faltas
  getCorBarra(faltas: number, limite: number): string {
    const porcentagem = (faltas / limite) * 100;
    if (porcentagem >= 75) return '#ef4444'; // Vermelho
    if (porcentagem >= 50) return '#f59e0b'; // Laranja
    return '#10b981'; // Verde
  }

  // Verifica se está no limite crítico (75% ou mais)
=======
  // Define a cor da barra
  getCorBarra(faltas: number, limite: number): string {
    const porcentagem = (faltas / limite) * 100;
    if (porcentagem >= 75) return '#ef4444';
    if (porcentagem >= 50) return '#f59e0b';
    return '#10b981';
  }

  // Verifica se está no limite
>>>>>>> educria
  estaNoLimite(faltas: number, limite: number): boolean {
    return faltas >= limite * 0.75;
  }

<<<<<<< HEAD
  // Retorna o maior valor de faltas (para definir escala do gráfico)
=======
  // Retorna o maior valor para escala
>>>>>>> educria
  get maxFaltas(): number {
    return Math.max(...this.dados.map(d => d.limiteTotal));
  }
}
<<<<<<< HEAD

=======
>>>>>>> educria
