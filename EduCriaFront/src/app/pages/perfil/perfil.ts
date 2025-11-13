import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {
  usuario = {
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    matricula: '2024001',
    turma: '3º Ano - Ensino Médio',
    escola: 'Colégio Exemplo'
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Carregar dados do localStorage ou backend
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
    }
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }

  sair() {
    if (confirm('Tem certeza que deseja sair?')) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  getIniciais(): string {
    const nomes = this.usuario.nome.split(' ');
    return nomes.length >= 2 
      ? `${nomes[0][0]}${nomes[nomes.length - 1][0]}`.toUpperCase()
      : nomes[0][0].toUpperCase();
  }
}