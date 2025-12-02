import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';   //  ✅ IMPORTAÇÃO CORRETA PARA ANGULAR STANDALONE

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  // Campos opcionais usados em várias páginas
  matricula?: string;
  turma?: string;
  escola?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  recuperarSenha(email: string) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:3000/usuarios';

  // Observable para usuários logados — permite que componentes reajam às mudanças
  private currentUserSubject = new BehaviorSubject<Usuario | null>(this.loadUserFromStorage());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // 🔹 LOGIN com API (JWT)
  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(response => this.applyLoginResponse(response))
    );
  }

  // Centraliza a escrita de sessão quando o servidor retorna token + usuario
  private applyLoginResponse(response: any) {
    if (!response) return;

    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    if (response.usuario) {
      localStorage.setItem('usuario', JSON.stringify(response.usuario));
      localStorage.setItem('usuarioLogado', response.usuario.nome);
      this.currentUserSubject.next(response.usuario);
    }

    // compatibilidade com código existente que checa 'logado'
    if (response.token || response.usuario) {
      localStorage.setItem('logado', 'true');
    }
  }

  // 🔹 VERIFICA TOKEN (USANDO JWT-DECODE)
  estaLogado(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
 const payload: any = (jwt_decode as any).default(token);
   //  ✅ FUNCIONA NO ANGULAR STANDALONE
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getUsuario(): Usuario | null {
    // Prefer observable state, fallback to localStorage (backwards compat)
    const v = this.currentUserSubject.getValue();
    if (v) return v;
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  getNomeUsuario(): string {
    return localStorage.getItem('usuarioLogado') || 'Usuário';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  cadastrar(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post(this.apiUrl, { nome, email, senha });
  }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  logout(): void {
    // Limpa apenas os itens relacionados à sessão
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('logado');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Utilitários
  private loadUserFromStorage(): Usuario | null {
    try {
      const u = localStorage.getItem('usuario');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  }

  // Retorna o id do usuário (se disponível) para chamadas ao backend
  getUsuarioId(): number | null {
    const u = this.getUsuario();
    return u && u.id ? u.id : null;
  }

  RecuperarSenha(email: string) {
    return this.http.post(`${this.apiUrl}/recuperar-senha`, { email });
  }
}
