import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
<<<<<<< HEAD
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // ✅ import do snackbar
=======
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
>>>>>>> educria

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: true,
<<<<<<< HEAD
  imports: [FormsModule, CommonModule, MatSnackBarModule] // ✅ adiciona snackbar aqui
=======
  imports: [FormsModule, CommonModule, MatSnackBarModule]
>>>>>>> educria
})
export class Cadastro {

  email: string = '';
  senha: string = '';
  nome: string = '';
  mostrarSenha: boolean = false; // ✅ adicionado

  constructor(
    private router: Router,
    private authService: AuthService,
<<<<<<< HEAD
    private snackBar: MatSnackBar // ✅ injeta snackbar
  ) { }
=======
    private snackBar: MatSnackBar
  ) {}

  // ✅ função pra alternar o tipo da senha
  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
>>>>>>> educria

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
<<<<<<< HEAD
        this.snackBar.open('❌ Erro ao cadastrar: ' + err.message, 'Fechar', {
          duration: 7000,
=======
        let mensagemErro = '❌ Ocorreu um erro ao cadastrar. Tente novamente.';

        if (err.status === 400) {
          mensagemErro = '⚠️ Este e-mail já está cadastrado!';
        } else if (err.status === 0) {
          mensagemErro = '⚠️ Não foi possível conectar ao servidor.';
        }

        this.snackBar.open(mensagemErro, 'Fechar', {
          duration: 4000,
>>>>>>> educria
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning']
        });
      }
    });
    if (!this.email.endsWith('@gmail.com')) {
  this.snackBar.open('⚠️ Apenas emails @gmail.com são permitidos!', 'Fechar', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['warning-snackbar']
  });
  return;
}
}
}
