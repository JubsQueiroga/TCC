import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule],
})
export class Cadastro {
  email: string = '';
  senha: string = '';
  nome: string = '';
  mostrarSenha: boolean = false;
  // Novos campos
  telefone: string = '';
  dataNascimento: string = '';
  escola: string = '';
  matricula: string = '';
  serie: string = '';
  turma: string = '';
  confirmarSenha: string = '';

  // Métodos para seleção por bloco
  selectSerie(value: string) {
    this.serie = value;
  }

  selectTurma(value: string) {
    this.turma = value;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }

  fazerCadastro() {
    // 🔹 1. Verifica campos obrigatórios
    // Verifica campos básicos obrigatórios
    if (!this.nome || !this.email || !this.senha) {
      this.mostrarAlerta('Preencha nome, email e senha!', true);
      return;
    }

    // Campos novos obrigatórios: telefone e matrícula
    if (!this.telefone) {
      this.mostrarAlerta('Telefone é obrigatório!', true);
      return;
    }

    if (!this.matricula) {
      this.mostrarAlerta('Número da matrícula é obrigatório!', true);
      return;
    }

    // Validar campos vazios simples (opcionalmente para outros campos)
    if (!this.confirmarSenha) {
      this.mostrarAlerta('Confirme a senha!', true);
      return;
    }

    // 🔹 2. Verifica domínio do e-mail
    if (!this.email.endsWith('@gmail.com')) {
      this.mostrarAlerta('Use um e-mail @gmail.com válido!', true);
      return;
    }

    // 🔹 3. Valida se senhas são iguais
    if (this.senha !== this.confirmarSenha) {
      this.mostrarAlerta('As senhas precisam ser iguais!', true);
      return;
    }

    // 🔹 4. Validação do telefone: precisa conter DDD (10 ou 11 dígitos)
    const apenasDigitos = (s: string) => (s || '').toString().replace(/\D+/g, '');
    const telefoneDigitos = apenasDigitos(this.telefone);
    if (!telefoneDigitos || (telefoneDigitos.length !== 10 && telefoneDigitos.length !== 11)) {
      this.mostrarAlerta('Telefone inválido. Informe DDD + número (ex: 11987654321)', true);
      return;
    }
    // não aceitar DDD começando com 0
    if (telefoneDigitos.length >= 10 && telefoneDigitos[0] === '0') {
      this.mostrarAlerta('DDD inválido. Comece com o código da região (ex: 11)', true);
      return;
    }

    // 🔹 5. Validação simples da escola: verificar se menciona cidades/indicadores de SP
    const isSchoolInSP = (nome: string) => {
      if (!nome) return false;
      const s = nome.toLowerCase();
      // palavras-chave simples para identificar escolas de SP
      const tokens = [
        'são paulo','sao paulo','sp','campinas','santos','sorocaba','ribeirão','ribeirao','sao bernardo',
        'sao bernardo','sao jose dos campos','sjc','guarulhos','osasco','barueri','mogi','taubate','taubaté',
        'presidente prudente','presidenteprudente','suzano','itapetininga','franca','bauru','araraquara'
      ];
      return tokens.some(t => s.indexOf(t) !== -1);
    };

    if (this.escola && !isSchoolInSP(this.escola)) {
      this.mostrarAlerta('Escola não parece ser da região de São Paulo. Informe uma instituição válida em SP.', true);
      return;
    }

    // 🔹 4. Chama o serviço de cadastro enviando todos os campos
    const payload = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone,
      data_nascimento: this.dataNascimento || null,
      escola: this.escola || null,
      matricula: this.matricula,
      serie: this.serie || null,
      turma: this.turma || null
    };

    this.authService.cadastrar(payload).subscribe({
      next: () => {
        this.mostrarAlerta('Cadastro realizado com sucesso!', false);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Se o e-mail já existir
        if (err.message?.includes('email já cadastrado')) {
          this.mostrarAlerta('Este e-mail já possui uma conta!', true);
        } else {
          this.mostrarAlerta('Erro ao cadastrar. Tente novamente.', true);
        }
      },
    });
  }

  // 🔹 Exibe o pop-up no centro
  private mostrarAlerta(mensagem: string, erro: boolean) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      panelClass: erro ? ['snackbar-warning'] : ['center-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
