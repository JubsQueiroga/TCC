import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // 🔹 LOGIN com API (backend)
  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(response => {
        if (response && response.token) {
          // Salva token
          localStorage.setItem('token', response.token);
          localStorage.setItem('isLoggedIn', 'true');
          
          // Salva dados do usuário
          if (response.usuario) {
            localStorage.setItem('usuario', JSON.stringify(response.usuario));
            localStorage.setItem('usuarioLogado', response.usuario.nome);
            console.log('✅ Login realizado:', response.usuario.nome);
          }
        }
      })
    );
  }

  // 🔹 CADASTRO
  cadastrar(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post(this.apiUrl, { nome, email, senha }); 
  }

  // 🔹 LISTAR USUÁRIOS
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // 🔹 LOGOUT - Limpa tudo e redireciona
  logout(): void {
    localStorage.clear();
    console.log('🚪 Logout realizado com sucesso!');
    this.router.navigate(['/login']);
  }

  // 🔹 VERIFICA SE ESTÁ LOGADO
  estaLogado(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true' && 
           localStorage.getItem('token') !== null;
  }

  // 🔹 RETORNA DADOS DO USUÁRIO LOGADO
  getUsuario(): Usuario | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  // 🔹 RETORNA NOME DO USUÁRIO
  getNomeUsuario(): string {
    return localStorage.getItem('usuarioLogado') || 'Usuário';
  }

  // 🔹 RETORNA TOKEN
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔹 LOGIN LOCAL (para testes sem backend)
  loginLocal(email: string, senha: string, nome?: string): boolean {
    if (email && senha) {
      const usuario = {
        id: 'user_' + Date.now(),
        nome: nome || email.split('@')[0], // Usa parte do email como nome
        email: email,
        token: this.gerarToken()
      };

      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('token', usuario.token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('usuarioLogado', usuario.nome);

      console.log('✅ Login local realizado:', usuario.nome);
      return true;
    }
    return false;
  }

  // 🔹 GERA TOKEN SIMPLES
  private gerarToken(): string {
    return 'token_' + Math.random().toString(36).substr(2, 9) + Date.now();
  }
}