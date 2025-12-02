import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Progresso } from '../../services/progresso';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-progresso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progresso.html',
  styleUrls: ['./progresso.css']
})
export class ProgressoComponent implements OnInit {

  dados: any = null;
  resumo: any = null; // resumo agregado (materias, totais, desempenho)

  constructor(private progresso: Progresso, private auth: AuthService) {}

  ngOnInit() {
    // Usa rota protegida /progresso/me ao invés de passar ID manual
    if (!this.auth.estaLogado()) {
      console.warn('Usuário não logado.');
      return;
    }

    this.progresso.getMe().subscribe({
      next: (r) => {
        console.log('Resumo progresso carregado:', r);
        this.resumo = r;
        // Mantemos a UI original: dados representa um único registro (o primeiro, se houver)
        this.dados = (Array.isArray(r.raw) && r.raw.length) ? r.raw[0] : null;
      },
      error: (e) => console.error('Erro ao carregar progresso (me):', e)
    });
  }
}
