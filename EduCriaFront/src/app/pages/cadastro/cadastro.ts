import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Adicione
import { CommonModule } from '@angular/common'; // Adicione
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Adicione esta linha!
})
export class Cadastro {

  email: string = '';
  senha: string = '';
  nome: string = '';

  constructor(private router: Router, private authService: AuthService) { }

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