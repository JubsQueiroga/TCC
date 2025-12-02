import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {
  usuario: Usuario | any = {
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    matricula: '2024001',
    turma: '3º Ano - Ensino Médio',
    escola: 'Colégio Exemplo'
  };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Inscreve-se no usuário atual (vem do serviço de autenticação)
    const u = this.authService.getUsuario();
    if (u) this.usuario = u;
    // também mantém o estado reativo se algo mudar no serviço
    this.authService.currentUser$.subscribe(updated => {
      if (updated) this.usuario = updated;
    });
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }

  sair() {
    if (confirm('Tem certeza que deseja sair?')) {
      this.authService.logout();
    }
  }

  getIniciais(): string {
    const nomes = this.usuario.nome.split(' ');
    return nomes.length >= 2 
      ? `${nomes[0][0]}${nomes[nomes.length - 1][0]}`.toUpperCase()
      : nomes[0][0].toUpperCase();
  }
}