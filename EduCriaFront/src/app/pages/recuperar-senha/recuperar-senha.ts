import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './recuperar-senha.html',
  styleUrls: ['./recuperar-senha.css']
})
export class RecuperarSenha {

  email: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  enviarEmail() {
    if (!this.email) {
      this.snackBar.open('Digite seu e-mail!', 'Fechar', { duration: 3000 });
      return;
    }

    this.snackBar.open('Se o email existir, enviaremos instruções!', 'Fechar', { duration: 3000 });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  voltar() {
    this.router.navigate(['/login']);
  }
}
