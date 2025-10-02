import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { Sobre } from './pages/sobre/sobre';
import { AuthGuard } from './shared/auth.guard'; // 👈 importar aqui

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'home', component: Home, canActivate: [AuthGuard] },   
  { path: 'sobre', component: Sobre, canActivate: [AuthGuard] }  
];
