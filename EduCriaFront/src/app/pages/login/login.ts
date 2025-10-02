import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../shared/auth.service'; // <- importe o serviço

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule, NgIf],
})
export class Login {
  email: string = '';
  senha: string = '';
  erro: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  fazerLogin() {
    this.authService.login(this.email, this.senha).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro no login', err);
        this.erro = 'Email ou senha inválidos!';
      }
    });
  }


}
