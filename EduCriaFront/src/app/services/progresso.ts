import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Progresso {

  private apiUrl = 'http://localhost:3000/progresso';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getByUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Busca o progresso do usuário autenticado pelo token
  getMe(): Observable<any> {
    const token = this.auth.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.get(`${this.apiUrl}/me`, { headers });
  }

  salvar(data: any): Observable<any> {
    // API atual espera POST /progresso/salvar
    const token = this.auth.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.post(`${this.apiUrl}/salvar`, data, { headers });
  }
}
