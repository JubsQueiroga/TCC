
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boletim',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boletim.html',
  styleUrls: ['./boletim.css']
})
export class Boletim {
  
  // DADOS DO BOLETIM
  boletim = [
    {
      materia: 'Matemática',
      bim1: 8.5,
      bim2: null,
      bim3: null,
      bim4: null,
      media: 8.5,
      faltas: 3,
      situacao: 'aprovado'
    },
    {
      materia: 'Português',
      bim1: 9.0,
      bim2: null,
      bim3: null,
      bim4: null,
      media: 9.0,
      faltas: 1,
      situacao: 'aprovado'
    },
    {
      materia: 'História',
      bim1: 5.5,
      bim2: null,
      bim3: null,
      bim4: null,
      media: 5.5,
      faltas: 7,
      situacao: 'recuperacao'
    },
    {
      materia: 'Geografia',
      bim1: 7.5,
      bim2: null,
      bim3: null,
      bim4: null,
      media: 7.5,
      faltas: 2,
      situacao: 'aprovado'
    },
    {
      materia: 'Física',
      bim1: 7.0,
      bim2: null,
      bim3: null,
      bim4: null,
      media: 7.0,
      faltas: 5,
      situacao: 'aprovado'
    },
    {
      materia: 'Química',
      bim1: 8.0,
      bim2: null,
      bim3: null,
      bim4: null,
      media: 8.0,
      faltas: 4,
      situacao: 'aprovado'
    }
  ];
}