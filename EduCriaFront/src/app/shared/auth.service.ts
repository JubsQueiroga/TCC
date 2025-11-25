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

  // 🔹 LOGIN com API (JWT)
  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(response => {
        if (response && response.token) {
          
          // Salvar token
          localStorage.setItem('token', response.token);

          // Salvar usuário
          if (response.usuario) {
            localStorage.setItem('usuario', JSON.stringify(response.usuario));
            localStorage.setItem('usuarioLogado', response.usuario.nome);
          }
        }
      })
    );
  }

  // 🔹 VERIFICA SE ESTÁ LOGADO
  estaLogado(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  // 🔹 RETORNA DADOS DO USUÁRIO
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

  // 🔹 CADASTRO
  cadastrar(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post(this.apiUrl, { nome, email, senha });
  }

  // 🔹 LISTAR USUÁRIOS
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // 🔹 LOGOUT
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // 🔹 RECUPERAR SENHA
  resetarSenha(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resetar-senha`, { email });
  }
}
