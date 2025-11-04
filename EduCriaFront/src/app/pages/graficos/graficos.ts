import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graficos.html',
  styleUrls: ['./graficos.css']
})
export class Graficos {
  
  dados = {
    bimestre1: 34,
    bimestre2: 12,
    bimestre3: 15,
    bimestre4: 11
  };

  constructor(private router: Router) {}

  voltarParaHome(): void {
    this.router.navigate(['/home']);
  }
}