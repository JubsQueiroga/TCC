import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule],
})
export class Cadastro {
  email: string = '';
  senha: string = '';
  nome: string = '';
  mostrarSenha: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }

  fazerCadastro() {
    // 🔹 1. Verifica campos obrigatórios
    if (!this.nome || !this.email || !this.senha) {
      this.mostrarAlerta('Preencha todos os campos!', true);
      return;
    }

    // 🔹 2. Verifica domínio do e-mail
    if (!this.email.endsWith('@gmail.com')) {
      this.mostrarAlerta('Use um e-mail @gmail.com válido!', true);
      return;
    }

    // 🔹 3. Chama o serviço de cadastro
    this.authService.cadastrar(this.nome, this.email, this.senha).subscribe({
      next: () => {
        this.mostrarAlerta('Cadastro realizado com sucesso!', false);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Se o e-mail já existir
        if (err.message?.includes('email já cadastrado')) {
          this.mostrarAlerta('Este e-mail já possui uma conta!', true);
        } else {
          this.mostrarAlerta('Erro ao cadastrar. Tente novamente.', true);
        }
      },
    });
  }

  // 🔹 Exibe o pop-up no centro
  private mostrarAlerta(mensagem: string, erro: boolean) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      panelClass: erro ? ['snackbar-warning'] : ['center-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
