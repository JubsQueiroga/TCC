import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/usuarios';

    constructor(private http: HttpClient) { }


    login(email: string, senha: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { email, senha });
    }

    // Criar novo usuário
    cadastrar(nome: string, email: string, senha: string): Observable<any> {
        return this.http.post(this.apiUrl, { nome, email, senha });
    }

    // Buscar todos (opcional)
    listarUsuarios(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}
