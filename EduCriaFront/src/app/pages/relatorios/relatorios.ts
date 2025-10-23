import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.html',
  styleUrls: ['./relatorios.css']
})
export class Relatorios {
  materias = [
    { nome: 'Matemática', status: 'CONTINUE', progresso: 90, cor: '#002855' },
    { nome: 'Português', status: 'CONTINUE', progresso: 10, cor: '#3E2723' },
    { nome: 'História', status: 'CONTINUE', progresso: 75, cor: '#B71C1C' },
    { nome: 'Física', status: 'COMEÇAR', progresso: 0, cor: '#263238' },
    { nome: 'Biologia', status: 'CONTINUE', progresso: 5, cor: '#1B5E20' },
    { nome: 'Geografia', status: 'FINALIZADO', progresso: 100, cor: '#2E7D32' },
    { nome: 'Química', status: 'CONTINUE', progresso: 25, cor: '#880E4F' },
    { nome: 'Filosofia', status: 'CONTINUE', progresso: 75, cor: '#388E3C' },
    { nome: 'Sociologia', status: 'CONTINUE', progresso: 90, cor: '#1B5E20' },
    { nome: 'Inglês', status: 'CONTINUE', progresso: 90, cor: '#1B5E20' },
  ];
constructor(private router: Router) {}  

  goBack() {
    this.router.navigate(['/home']);
  }
}