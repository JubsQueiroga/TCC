import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-humanas',
  templateUrl: './humanas.html',
  styleUrls: ['./humanas.css']
})
export class HumanasComponent {

  constructor(private router: Router) { }

  goBack(): void {
  window.history.back();
}
startGeografia(): void {
  this.router.navigate(['/geografia']);
}

  startHistoria(): void {
  this.router.navigate(['/historia']);
}
}