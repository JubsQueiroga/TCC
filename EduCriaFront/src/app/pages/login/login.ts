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

  ngOnInit() {
    console.log("🟢 Login component inicializado");

    // 🔥 Se já estiver logado, redireciona para /home automaticamente
    const logado = localStorage.getItem('logado');

    if (logado === 'true') {
      console.log("⚠️ Usuário já logado → redirecionando para /home...");
      this.router.navigate(['/home']);
    }
  }

  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  fazerLogin() {

    console.log("📤 Enviando login:", this.email, this.senha);

    if (!this.email || !this.senha) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    this.authService.login(this.email, this.senha).subscribe({
      next: (res: any) => {
        console.log("📥 Resposta do servidor:", res);

        // 🔥 Salva token se existir
        if (res.token) {
          localStorage.setItem("token", res.token);
        }

        // 🔥 SALVA LOGIN PERSISTENTE
        localStorage.setItem("logado", "true");

        this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
          duration: 3000,
        });

        // 🔥 Redireciona para /home
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log("❌ ERRO NO LOGIN:", err);
        this.erro = 'E-mail ou senha incorretos.';
      }
    });
  }

  recuperarSenha() {
    if (!this.email) {
      this.snackBar.open('Digite seu e-mail para recuperar a senha.', 'Fechar', {
        duration: 3000,
      });
      return;
    }

    this.authService.resetarSenha(this.email).subscribe({
      next: () => {
        this.snackBar.open('E-mail de recuperação enviado!', 'Fechar', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackBar.open('Erro ao enviar o e-mail. Tente novamente.', 'Fechar', {
          duration: 3000,
        });
      }
    });
  }
}
