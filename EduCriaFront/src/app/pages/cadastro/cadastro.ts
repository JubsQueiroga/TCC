import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class Cadastro {

  email: string = '';
  senha: string = '';
  nome: string = '';
  mostrarSenha: boolean = false; // ✅ Propriedade adicionada

  constructor(private router: Router, private authService: AuthService) { }

  // ✅ Método adicionado
  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }

  fazerCadastro() {
    if (!this.nome || !this.email || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }
    
    this.authService.cadastrar(this.nome, this.email, this.senha).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Erro ao cadastrar: ' + err.message);
      }
    });
  }
}