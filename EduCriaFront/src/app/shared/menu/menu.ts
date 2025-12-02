import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'] 
})
export class Menu {
  nomeUsuario: string = '';

  constructor(private router: Router, private auth: AuthService) {
    // inicializa com nome salvo se houver
    this.nomeUsuario = this.auth.getNomeUsuario();
    // escuta atualizações para refletir novo nome após login/edição
    this.auth.currentUser$.subscribe(u => { if (u && u.nome) this.nomeUsuario = u.nome; });
  }

  logout() {
    // Use centralized logout to clear session state and notify app
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
