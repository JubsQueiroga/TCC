
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
  get totalFaltas(): number {
    return this.dados.reduce((acc, item) => acc + item.faltas, 0);
  }

  // Calcula a porcentagem
  calcularPorcentagem(faltas: number, limite: number): number {
    return Math.round((faltas / limite) * 100);
  }

  // Define a cor da barra
  getCorBarra(faltas: number, limite: number): string {
    const porcentagem = (faltas / limite) * 100;
    if (porcentagem >= 75) return '#ef4444';
    if (porcentagem >= 50) return '#f59e0b';
    return '#10b981';
  }

  // Verifica se está no limite
  estaNoLimite(faltas: number, limite: number): boolean {
    return faltas >= limite * 0.75;
  }

  // Retorna o maior valor para escala
  get maxFaltas(): number {
    return Math.max(...this.dados.map(d => d.limiteTotal));
  }
}
