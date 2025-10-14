import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.html',
  styleUrls: ['./atividades.css']
})
export class Atividades {
  constructor(private location: Location) {}

  voltar() {
    this.location.back();
  }

  relatorios = [
    {
      titulo: 'MATEMÁTICA',
      texto:
        'Você possui um bom desempenho em matemática e é capaz de resolver problemas de maneira rápida e precisa. Sua maior dificuldade está em raciocínios mais abstratos, como álgebra. Recomenda-se continuar praticando esses conteúdos para aprimorar ainda mais sua compreensão.'
    },
    {
      titulo: 'HISTÓRIA',
      texto:
        'Você tem se destacado em história, mostrando grande facilidade em compreender a cronologia dos fatos históricos. Seu desempenho nas avaliações é excelente e sua capacidade de argumentação é cada vez mais consistente.'
    },
    {
      titulo: 'PORTUGUÊS',
      texto:
        'Você demonstra bom domínio da língua portuguesa, mostrando progresso em sua capacidade de leitura e interpretação de textos. No entanto, precisa melhorar a escrita em relação à estruturação de parágrafos e coesão textual. Recomenda-se mais prática na produção de textos.'
    }
  ];
}