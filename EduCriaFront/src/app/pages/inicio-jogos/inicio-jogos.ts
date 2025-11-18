import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-jogos',
  standalone: true,
  templateUrl: './inicio-jogos.html',
  styleUrls: ['./inicio-jogos.css']
})
export class InicioJogos {

  constructor(private router: Router) {}

  iniciar() {
    this.router.navigate(['/jogos']);
  }
}
