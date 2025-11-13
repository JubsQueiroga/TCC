import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { Sobre } from './pages/sobre/sobre';
import { Noticias } from './pages/noticias/noticias';
import { AuthGuard } from './shared/auth.guard'; 
import { Atividades } from './pages/atividades/atividades';
import { Relatorios } from './pages/relatorios/relatorios';
import { Exatas } from './pages/exatas/exatas'; 
import { Calendario } from './pages/calendario/calendario';
import { Graficos } from './pages/graficos/graficos';
import { Jogos } from './pages/jogos/jogos';
import { Perfil } from './pages/perfil/perfil';
import { Boletim } from './page/boletim/boletim';
import { Faltas } from './pages/faltas/faltas';
import { Matematica } from './pages/matematica/matematica';
import { Fisica } from './pages/fisica/fisica';
import { Quimica } from './pages/quimica/quimica';
import { LinguagensComponent } from './pages/linguagens/linguagens'; 
import { Redacao } from './pages/redacao/redacao';
import { Literatura } from './pages/literatura/literatura';
import { HumanasComponent } from './pages/humanas/humanas';
import { Geografia } from './pages/geografia/geografia';
import { Historia } from './pages/historia/historia';
import { NaturezasComponent } from './pages/naturezas/naturezas';
import { Biologia } from './pages/biologia/biologia';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'atividades', component: Atividades },
  { path: 'home', component: Home, canActivate: [AuthGuard] },   
  { path: 'sobre', component: Sobre, canActivate: [AuthGuard] },
  { path: 'noticias', component: Noticias, canActivate: [AuthGuard] },
  { path: 'relatorios', component: Relatorios, canActivate: [AuthGuard] },
  { path: 'exatas', component: Exatas, canActivate: [AuthGuard] }, 
  { path: 'linguagens', component: LinguagensComponent, canActivate: [AuthGuard] },
  { path: 'humanas', component: HumanasComponent, canActivate: [AuthGuard] },
  { path: 'natureza', component: NaturezasComponent, canActivate: [AuthGuard] },
  { path: 'historia', component: Historia, canActivate: [AuthGuard] },
  { path: 'geografia', component: Geografia, canActivate: [AuthGuard] },
  { path: 'redacao', component: Redacao, canActivate: [AuthGuard] },
  { path: 'calendario', component: Calendario, canActivate: [AuthGuard] },
  { path: 'literatura', component: Literatura, canActivate: [AuthGuard] },
  { path: 'graficos', component: Graficos, canActivate: [AuthGuard] },
  { path: 'jogos', component: Jogos, canActivate: [AuthGuard] },
  { path: 'perfil', component: Perfil, canActivate: [AuthGuard] },
  { path: 'boletim', component: Boletim, canActivate: [AuthGuard] },
  { path: 'faltas', component: Faltas, canActivate: [AuthGuard] },
  { path: 'matematica', component: Matematica, canActivate: [AuthGuard] },
  { path: 'fisica', component: Fisica, canActivate: [AuthGuard] },
  { path: 'quimica', component: Quimica, canActivate: [AuthGuard] },
  { path: 'biologia', component: Biologia, canActivate: [AuthGuard] },
];