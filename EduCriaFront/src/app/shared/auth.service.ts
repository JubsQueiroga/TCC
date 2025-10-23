import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para representar um usuário (adaptada do seu UsuarioComponent)
export interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  autenticado: any;
  fazerLogin(usuario: Usuario) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:3000/usuarios'; // Ajuste se a rota for '/usuario'

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha });
  }

  // Criar novo usuário
  cadastrar(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post(this.apiUrl, { nome, email, senha }); 
  }

  // Buscar todos (corrigido: sem parâmetro desnecessário, tipado como Usuario[])
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // 🔹 ADICIONAR - Verifica se o usuário está logado
  estaLogado(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // 🔹 ADICIONAR - Retorna os dados do usuário logado
  getUsuario(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  // 🔹 ADICIONAR - Faz logout limpando localStorage
  logout(): void {
    localStorage.clear();
  }

  // 🔹 ADICIONAR - Gera token simples (exemplo)
  private gerarToken(): string {
    return 'token_' + Math.random().toString(36).substr(2, 9);
  }

  // 🔹 ADICIONAR - Exemplo de login local com token
  loginLocal(email: string, senha: string): boolean {
    if (email && senha) {
      const usuario = {
        id: 'user_' + Date.now(),
        email: email,
        token: this.gerarToken()
      };

      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('token', usuario.token);

      return true;
    }
    return false;
  }
}
