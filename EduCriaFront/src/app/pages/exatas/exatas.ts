import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exatas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exatas.html',
  styleUrls: ['./exatas.css']
})
export class Exatas {
  
  materias = [
    { nome: 'Matemática', progresso: 90, status: 'CONTINUE' },
    { nome: 'Física', progresso: 0, status: 'COMEÇAR' },
    { nome: 'Química', progresso: 25, status: 'CONTINUE' }
  ];

  constructor(private router: Router) {}

  goBack() {
    window.history.back(); 
  }

  iniciarMateria(materia: string) {
    console.log(`Iniciando ${materia}`);
    
    const rotas: { [key: string]: string } = {
      'Matemática': '/matematica',
      'Física': '/fisica',
      'Química': '/quimica'
    };
    
    this.router.navigate([rotas[materia]]);
  }
}