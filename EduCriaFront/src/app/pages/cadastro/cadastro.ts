import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule]
})
export class Cadastro {

  email: string = '';
  senha: string = '';
  nome: string = '';
  mostrarSenha: boolean = false; // ✅ adicionado

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  // ✅ função pra alternar o tipo da senha
  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }

  fazerCadastro() {
    if (!this.nome || !this.email || !this.senha) {
      this.snackBar.open('⚠️ Preencha todos os campos!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['warning-snackbar']
      });
      return;
    }

    this.authService.cadastrar(this.nome, this.email, this.senha).subscribe({
      next: () => {
        this.snackBar.open('✅ Cadastro realizado com sucesso!', 'Fechar', {
          duration: 7000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['center-snackbar']
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open('❌ Erro ao cadastrar: ' + err.message, 'Fechar', {
          duration: 7000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning']
        });
      }
    });
  }
}
