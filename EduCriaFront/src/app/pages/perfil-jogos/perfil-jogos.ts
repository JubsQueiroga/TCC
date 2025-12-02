import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-jogos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-jogos.html',
  styleUrls: ['./perfil-jogos.css']
})
export class PerfilJogos implements OnInit {
  usuario: Partial<Usuario> = {
    nome: 'João Silva',
    matricula: '2024001'
  };

  pontuacaoTotal = 0;

  ultimoQuiz = {
    categoria: 'Exatas',
    acertos: 0,
    total: 5,
    pontos: 0
  };

  historico: any[] = [];

  conquistas = [
    { nome: 'Primeira Vitória', icone: '🎯', desbloqueada: false },
    { nome: 'Sequência 5x', icone: '🔥', desbloqueada: false },
    { nome: 'Mestre Exatas', icone: '📐', desbloqueada: false },
    { nome: 'Perfeccionista', icone: '💯', desbloqueada: false },
    { nome: 'Maratonista', icone: '🏃', desbloqueada: false },
    { nome: 'Dedicado', icone: '⭐', desbloqueada: false },
    { nome: 'Humanas Pro', icone: '📚', desbloqueada: false },
    { nome: 'Lendário', icone: '👑', desbloqueada: false }
  ];

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    // Carregar dados do usuário a partir do estado central (AuthService)
    const u = this.auth.getUsuario();
    if (u) {
      this.usuario = u;
    }

    // Também escuta atualizações reativas (por exemplo, depois de editar perfil)
    this.auth.currentUser$.subscribe(updated => {
      if (updated) this.usuario = updated;
    });

    // Carregar último quiz
    const ultimoQuizSalvo = localStorage.getItem('ultimoQuiz');
    if (ultimoQuizSalvo) {
      this.ultimoQuiz = JSON.parse(ultimoQuizSalvo);
    }

    // Carregar pontuação total
    const pontuacaoSalva = localStorage.getItem('pontuacaoTotal');
    if (pontuacaoSalva) {
      this.pontuacaoTotal = parseInt(pontuacaoSalva);
    }

    // Carregar histórico
    const historicoSalvo = localStorage.getItem('historicoQuiz');
    if (historicoSalvo) {
      this.historico = JSON.parse(historicoSalvo);
    } else {
      // Dados de exemplo
      this.historico = [
        {
          categoria: 'Exatas',
          acertos: 4,
          total: 5,
          pontos: 80,
          data: 'Hoje, 14:30'
        },
        {
          categoria: 'Humanas',
          acertos: 3,
          total: 5,
          pontos: 60,
          data: 'Ontem, 16:45'
        },
        {
          categoria: 'Extras',
          acertos: 5,
          total: 5,
          pontos: 100,
          data: '15/11/2025'
        }
      ];
    }

    // Verificar conquistas
    this.verificarConquistas();
  }

  verificarConquistas() {
    // Primeira vitória
    if (this.historico.length > 0) {
      this.conquistas[0].desbloqueada = true;
    }

    // Perfeccionista (acertou todas em algum quiz)
    if (this.historico.some(h => h.acertos === h.total)) {
      this.conquistas[3].desbloqueada = true;
    }

    // Maratonista (jogou 5+ vezes)
    if (this.historico.length >= 5) {
      this.conquistas[4].desbloqueada = true;
    }

    // Dedicado (pontuação total > 500)
    if (this.pontuacaoTotal >= 500) {
      this.conquistas[5].desbloqueada = true;
    }
  }

  calcularPercentual(): number {
    if (this.ultimoQuiz.total === 0) return 0;
    return Math.round((this.ultimoQuiz.acertos / this.ultimoQuiz.total) * 100);
  }

  getIniciais(): string {
    const nome = this.usuario.nome ?? 'Usuário';
    const nomes = nome.split(' ');
    return nomes.length >= 2 
      ? `${nomes[0][0]}${nomes[nomes.length - 1][0]}`.toUpperCase()
      : nomes[0][0].toUpperCase();
  }

  voltarQuiz() {
    this.router.navigate(['/jogos']);
  }

  verPerfil() {
    this.router.navigate(['/perfil']);
  }

  irParaJogos() {
    this.router.navigate(['/jogos']);
  }
}