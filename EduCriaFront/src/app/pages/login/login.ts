import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule],
})
export class Login {
  email: string = '';
  senha: string = '';
  erro: string = '';
  mostrarSenha: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('Login iniciado');
    // 🔹 Verifica login contínuo
    if (this.authService.estaLogado()) {
      this.router.navigate(['/home']);
    }
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  fazerLogin() {
    // 🔹 Chama o AuthService para validar login
    this.authService.login(this.email, this.senha).subscribe({
      next: (res) => {
        // 🔹 Guarda token no localStorage (login contínuo)
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro no login', err);
        this.erro = 'Email ou senha inválidos!';
      },
    });
  }
}
