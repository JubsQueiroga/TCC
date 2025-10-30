import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Cadastro {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  mostrarSenha = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  cadastrar(): void {
    // Validação de campos vazios
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      this.snackBar.open('⚠️ Preencha todos os campos!', 'Fechar', {
        duration: 3000,
        panelClass: ['snackbar-warning'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    // Validação de senhas diferentes
    if (this.senha !== this.confirmarSenha) {
      this.snackBar.open('❌ As senhas não conferem!', 'Fechar', {
        duration: 3000,
        panelClass: ['snackbar-warning'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    // Chama o serviço de cadastro
    this.authService.cadastrar(this.nome, this.email, this.senha).subscribe({
      next: (response) => {
        this.snackBar.open('✅ Cadastro realizado com sucesso!', 'OK', {
          duration: 3000,
          panelClass: ['center-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        
        // 🔹 Verifica se é erro 400 (email duplicado)
        if (err.status === 400) {
          this.snackBar.open('❌ Esse email já está cadastrado', 'Fechar', {
            duration: 4000,
            panelClass: ['snackbar-warning'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        } 
        // 🔹 Outros erros
        else {
          this.snackBar.open('❌ Erro ao cadastrar. Tente novamente!', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-warning'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      }
    });
  }

  toggleMostrarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }
}