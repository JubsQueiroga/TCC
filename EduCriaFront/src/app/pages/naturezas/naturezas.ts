import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-naturezas',
  templateUrl: './naturezas.html',
  styleUrls: ['./naturezas.css']
})
export class NaturezasComponent {

  constructor(private router: Router) { }

  goBack(): void {
    window.history.back();
  }

  startBiologia(): void {
    this.router.navigate(['/biologia']);
  }
}