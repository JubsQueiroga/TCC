import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { Sobre } from './pages/sobre/sobre';
import { Noticias } from './pages/noticias/noticias';
import { AuthGuard } from './shared/auth.guard'; 
import { Atividades } from './pages/atividades/atividades';
import { Relatorios } from './pages/relatorios/relatorios';
import { Calendario } from './pages/calendario/calendario';
import { Graficos } from './pages/graficos/graficos';
import { Jogos } from './pages/jogos/jogos';
<<<<<<< HEAD
import { Perfil } from './pages/perfil/perfil';
import { Boletim } from './page/boletim/boletim';
import { Faltas } from './pages/faltas/faltas';


=======
import { Boletim } from './pages/boletim/boletim';
import { Perfil } from './pages/perfil/perfil';
import { Faltas } from './pages/faltas/faltas'; 
>>>>>>> educria
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'atividades', component: Atividades },
  { path: 'home', component: Home, canActivate: [AuthGuard] },   
  { path: 'sobre', component: Sobre, canActivate: [AuthGuard] },
  { path: 'noticias', component: Noticias, canActivate: [AuthGuard] },
  { path: 'relatorios', component: Relatorios, canActivate: [AuthGuard] },
  { path: 'calendario', component: Calendario, canActivate: [AuthGuard]},
  { path: 'graficos', component: Graficos, canActivate: [AuthGuard]},
  { path: 'jogos', component: Jogos, canActivate: [AuthGuard]},
<<<<<<< HEAD
  { path: 'perfil', component: Perfil, canActivate: [AuthGuard] },
  { path: 'boletim', component: Boletim, canActivate: [AuthGuard] },
  { path: 'faltas', component: Faltas, canActivate: [AuthGuard] },
=======
  { path: 'boletim', component: Boletim, canActivate: [AuthGuard]},
  { path: 'perfil', component: Perfil, canActivate: [AuthGuard]}, 
  { path: 'faltas', component: Faltas, canActivate: [AuthGuard]},
>>>>>>> educria
];
