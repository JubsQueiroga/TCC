import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styles: ['']
})
export class Perfil {
  constructor(private router: Router) {}  

  goBack() {
    this.router.navigate(['/home']);
  }
}


