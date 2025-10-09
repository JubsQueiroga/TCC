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
    return this.http.post(this.apiUrl, { nome, email, senha }); // Se backend espera 'nome_usuario', mude para { nome_usuario: nome, email, senha }
  }

  // Buscar todos (corrigido: sem parâmetro desnecessário, tipado como Usuario[])
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
  
}