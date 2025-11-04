import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  


@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticias.html',
  styleUrls: ['./noticias.css']
})
export class Noticias {
  
  noticias = [
    { 
      titulo: 'Palestra sobre novembro azul\ndata: 11/11 às 14h20', 
      icone: ' 🎗',
      cor: '#4a6b8a'
    },
    { 
      titulo: 'Palestra sobre Slam\ndia 25/11 - 14h20', 
      icone: '✊',
      cor: '#4a6b8a'
    },
    { 
      titulo: 'dia 20/11 - feriado', 
      icone: '🏖️',
      cor: '#4a6b8a'
    },
    { 
      titulo: 'nenhuma nova notícia', 
      icone: '✕',
      cor: '#4a6b8a'
    }
  ];
  
  
  irParaCalendario(): void {
    this.router.navigate(['/calendario']);
  }

  constructor(private router: Router) {}  
  
  goBack() {
    this.router.navigate(['/calendario']);  
  }
}