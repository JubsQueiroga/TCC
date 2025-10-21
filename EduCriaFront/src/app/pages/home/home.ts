import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../shared/menu/menu';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [Menu, Footer],
  standalone: true,
})
export class Home{
  constructor(private router: Router) {}

  irParaSobre() {
    this.router.navigate(['/sobre']);
  }
  irParaAtividades() {
    this.router.navigate(['/atividades']);
  }
  irParaNoticias() {
    this.router.navigate(['/noticias']);
  }
irParaRelatorios() {
    this.router.navigate(['/relatorios']);
  }
  irParaCalendario() {
    this.router.navigate(['/calendario']);
  }
  irParaGraficos() {
    this.router.navigate(['/graficos']);
  }
  irParaJogos() {
    this.router.navigate(['/jogos']);
  }
}