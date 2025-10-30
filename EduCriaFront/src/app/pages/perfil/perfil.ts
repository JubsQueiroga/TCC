<<<<<<< HEAD
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {
  constructor(private router: Router) {}  

  goBack() {
    this.router.navigate(['/home']);
  }
}


=======

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil {
  
  // DADOS DO ALUNO
  aluno = {
    nome: 'João Silva Santos',
    iniciais: 'JS',
    matricula: '2024001234',
    serie: '3º Ano - Ensino Médio',
    dataNascimento: '15/03/2007',
    cpf: '123.456.789-00',
    email: 'joao.silva@educria.com.br',
    telefone: '(19) 98765-4321',
    turma: '3ºA - Matutino',
    anoLetivo: '2024'
  };
}
>>>>>>> educria
