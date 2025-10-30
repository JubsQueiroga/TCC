import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../shared/menu/menu';
import { Footer } from '../../shared/footer/footer';
<<<<<<< HEAD
import { NgIf } from '@angular/common'; // ADICIONE ESTA LINHA

=======
import { NgIf } from '@angular/common';
import { AuthService } from '../../shared/auth.service'; // 🔹 Mantido do código antigo
>>>>>>> educria

@Component({
  selector: 'app-home',
  templateUrl:'./home.html',
  styleUrls: ['./home.css'],
<<<<<<< HEAD
 imports: [Menu, Footer, NgIf], // ADICIONE NgIf AQUI
  standalone: true,
})
export class Home{
   menuAberto = false; // ADICIONE ESTA LINHA

  constructor(private router: Router) {}
 toggleMenu() {
    this.menuAberto = !this.menuAberto;
 }
=======
  imports: [Menu, Footer, NgIf],
  standalone: true,
})
export class Home {
  menuAberto = false;

  constructor(
    private router: Router,
    private authService: AuthService // 🔹 Reintroduzido do código antigo
  ) {}

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
>>>>>>> educria

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
<<<<<<< HEAD
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
=======

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

  // 🔹 Alterado: logout agora usa AuthService para encerrar sessão
  sair(): void {
    this.menuAberto = false;
    this.authService.logout(); // 🔹 Login contínuo garantido
    this.router.navigate(['/login']);
  }
}
>>>>>>> educria
