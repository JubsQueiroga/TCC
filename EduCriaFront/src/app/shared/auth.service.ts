import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
  private apiUrl = 'http://localhost:3000/usuarios'; // ajuste conforme sua porta/rota

  constructor(private http: HttpClient) {}

  // Faz login com email + senha; salva token e nome no localStorage
  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          const nome = response.usuario?.nome;
          if (nome) {
            localStorage.setItem('usuarioLogado', nome);
            console.log('Usuário salvo no localStorage:', nome);
          } else {
            console.warn('⚠️ Nenhum nome encontrado na resposta do login.');
          }
        }
      })
    );
  }

  // Cadastro — envia nome, email, senha
  cadastrar(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { nome, email, senha });
  }

  // Listar usuários
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Verifica se está logado
  estaLogado(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogado');
  }

  // Métodos simulados (pode trocar por chamadas reais ao backend quando tiver endpoints específicos)
  changeUsername(newUsername: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
          localStorage.setItem('usuarioLogado', newUsername);
        }
        resolve(success);
      }, 1000);
    });
  }

  changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const success = Math.random() > 0.5;
        resolve(success);
      }, 1000);
    });
  }

  deleteUser(password: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
          localStorage.removeItem('token');
          localStorage.removeItem('usuarioLogado');
        }
        resolve(success);
      }, 1000);
    });
  }
}