import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../shared/menu/menu';
import { Footer } from '../../shared/footer/footer';
import { NgIf } from '@angular/common'; // ADICIONE ESTA LINHA


@Component({
  selector: 'app-home',
  templateUrl:'./home.html',
  styleUrls: ['./home.css'],
 imports: [Menu, Footer, NgIf], // ADICIONE NgIf AQUI
  standalone: true,
})
export class Home{
   menuAberto = false; // ADICIONE ESTA LINHA

  constructor(private router: Router) {}
 toggleMenu() {
    this.menuAberto = !this.menuAberto;
 }

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
  irParaPerfil() {
     this.menuAberto = false; 
    this.router.navigate(['/perfil']);
  }
  irParaBoletim() {
     this.menuAberto = false; 
    this.router.navigate(['/boletim']);
  }
  irParaFaltas() {
     this.menuAberto = false; 
    this.router.navigate(['/faltas']);
  }
  // ADICIONE ESTA FUNÇÃO
  sair() {
    this.menuAberto = false;
    this.router.navigate(['/login']);
  }
}