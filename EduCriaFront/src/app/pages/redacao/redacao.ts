import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './redacao.html',
  styleUrls: ['./redacao.css']
})
export class Redacao {
  redacaoTexto: string = '';

  constructor(private router: Router) {}

  onBackClick(): void {
    this.router.navigate(['/home']);
  }

  salvarRedacao(): void {
    console.log('Redação salva:', this.redacaoTexto);
    // TODO: Adicionar lógica para salvar a redação
  }
}