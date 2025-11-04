import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  senha: string = '';
  mostrarSenha: boolean = false;
  erro: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  toggleMostrarSenha() {
   this.mostrarSenha = !this.mostrarSenha;
  }

  fazerLogin() {
    if (!this.email || !this.senha) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    this.authService.login(this.email, this.senha).subscribe({
      next: () => {
        this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/home']);
      },
      error: () => {
        this.erro = 'E-mail ou senha incorretos.';
      }
    });
  }
}
