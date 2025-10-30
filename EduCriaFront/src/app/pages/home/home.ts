import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../shared/menu/menu';
import { Footer } from '../../shared/footer/footer';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [Menu, Footer, CommonModule],
  standalone: true,
})
export class Home {
  menuAberto = false;
  nomeUsuario: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.nomeUsuario = this.authService.getNomeUsuario();
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  sair(): void {
    // 🔹 Mostra confirmação com Snackbar
    const snackBarRef = this.snackBar.open('Deseja realmente sair?', 'SIM', {
      duration: 5000,
      panelClass: ['snackbar-warning'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    // 🔹 Se clicar em "SIM"
    snackBarRef.onAction().subscribe(() => {
      this.menuAberto = false;
      this.authService.logout();
      this.snackBar.open('👋 Até logo!', '', {
        duration: 2000,
        panelClass: ['center-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }

  irParaPerfil(): void {
    this.menuAberto = false;
    this.router.navigate(['/perfil']);
  }

  irParaBoletim(): void {
    this.menuAberto = false;
    this.router.navigate(['/boletim']);
  }

  irParaFaltas(): void {
    this.menuAberto = false;
    this.router.navigate(['/faltas']);
  }

  irParaAtividades(): void {
    this.router.navigate(['/atividades']);
  }

  irParaNoticias(): void {
    this.router.navigate(['/noticias']);
  }

  irParaRelatorios(): void {
    this.router.navigate(['/relatorios']);
  }

  irParaCalendario(): void {
    this.router.navigate(['/calendario']);
  }

  irParaGraficos(): void {
    this.router.navigate(['/graficos']);
  }

  irParaJogos(): void {
    this.router.navigate(['/jogos']);
  }
}