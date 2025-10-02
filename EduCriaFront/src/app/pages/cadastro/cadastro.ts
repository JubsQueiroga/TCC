import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: true,
})
export class Cadastro {

  constructor(private router: Router, authService: AuthService) { }

  email: string = '';
  senha: string = '';
  nome: string = ''

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }

  fazerCadastro() {
    // this.authService.cadastrar().subscribe({

    // });
  }
}
