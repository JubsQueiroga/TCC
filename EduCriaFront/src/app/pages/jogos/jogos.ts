import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ⬅️ ADICIONE ESTA LINHA

interface Question {
  id: number;
  category: 'Exatas' | 'Humanas' | 'Extras';
  text: string;
  options: string[];
  correctIndex: number;
}

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jogos.html',
  styleUrls: ['./jogos.css'],
})
export class Jogos {
  questions: Question[] = [
    {
      id: 1,
      category: 'Exatas',
      text: 'Qual é a unidade básica de massa no SI?',
      options: ['Grama', 'Quilograma', 'Tonelada', 'Libra'],
      correctIndex: 1,
    },
    {
      id: 2,
      category: 'Humanas',
      text: 'Quem escreveu "Os Lusíadas"?',
      options: ['Camões', 'Machado de Assis', 'Clarice Lispector', 'Fernando Pessoa'],
      correctIndex: 0,
    },
    {
      id: 3,
      category: 'Extras',
      text: 'Qual planeta é conhecido como Planeta Vermelho?',
      options: ['Vênus', 'Marte', 'Júpiter', 'Saturno'],
      correctIndex: 1,
    }
  ];

  currentIndex = 0;
  selectedOption: number | null = null;
  score = 0;
  finished = false;

  categoryCorrect = {
    Exatas: 0,
    Humanas: 0,
    Extras: 0,
  };

  // ⬅️ CORRIGIDO: Injeta o Router corretamente
  constructor(private router: Router) {}

  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  get progressPercent() {
    return (this.currentIndex / this.questions.length) * 100;
  }

  submitAnswer() {
    if (this.selectedOption === this.currentQuestion.correctIndex) {
      this.score++;
      this.categoryCorrect[this.currentQuestion.category]++;
    }
    this.next();
  }

  skip() {
    this.selectedOption = null;
    this.next();
  }

  next() {
    this.selectedOption = null;

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.finished = true;
    }
  }

  get percent() {
    return (this.score / this.questions.length) * 100;
  }

  // ⬅️ Função para ir ao perfil de jogos
  irParaPerfilJogos() {
    this.router.navigate(['/perfil-jogos']);
  }

  restart() {
    this.currentIndex = 0;
    this.score = 0;
    this.selectedOption = null;
    this.finished = false;
    this.categoryCorrect = { Exatas: 0, Humanas: 0, Extras: 0 };
  }
  
voltarHome() {
  this.router.navigate(['/home']);
}
}