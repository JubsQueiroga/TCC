import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'] 
})
export class Menu {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');  
    this.router.navigate(['/login']);   
  }
}
