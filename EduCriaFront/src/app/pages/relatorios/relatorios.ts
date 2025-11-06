import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.html',
  styleUrls: ['./relatorios.css']
})
export class Relatorios {
  
  constructor(private router: Router) {}

  navigateTo(area: string) {
    this.router.navigate([`/${area}`]);
  }

  goBack() {
    window.history.back();
  }
}