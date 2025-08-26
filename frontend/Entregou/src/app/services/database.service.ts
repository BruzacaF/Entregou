import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';




export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  role: 'ADMIN' | 'MOTORISTA' | 'CLIENTE';
}

export interface UsuarioAutoComplete {
  id: number;
  nome: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  role: 'ADMIN' | 'MOTORISTA' | 'CLIENTE';
}

@Injectable({ providedIn: 'root' })

export class DatabaseService {

  private apiUrl = 'http://localhost:8080'; // URL base da API
  private http = inject(HttpClient);

  constructor() { }

  register(registerData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, registerData);
  }

  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, loginData).pipe(
      tap(response => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('role', response.role);
      })
    );
  }

  adicionarPacote(pacote: any): Observable<any> {
    console.log('Pacote a ser adicionado:', pacote);
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.apiUrl}/pacotes`, pacote, { headers });
  }

  listarMeusPacotes(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any[]>(`${this.apiUrl}/pacotes/meusPacotes`, { headers });
  }

  apagarPacote(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.delete(`${this.apiUrl}/pacotes/${id}`, { headers });
  }

  buscarUsuarios(termo: string): Observable<UsuarioAutoComplete[]> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    if (!termo.trim()) {
      return of([]);
    }

    return this.http.get<UsuarioAutoComplete[]>(`${this.apiUrl}/api/usuarios/autocomplete?termo=${termo}`, { headers }).pipe(


      catchError(error => {
        console.error('Erro na busca de usuários:', error);
        return of([]);
      })
    );
  }



  logout(): void {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): 'ADMIN' | 'MOTORISTA' | 'CLIENTE' | null {
    const role = localStorage.getItem('role');
    return role as 'ADMIN' | 'MOTORISTA' | 'CLIENTE' | null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
