import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  message: string;
  token: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    age: number;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(
    email: string,
    password: string
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    );

  }

  register(data: {
    name: string;
    email: string;
    password: string;
    age: number;
  }): Observable<RegisterResponse> {

    return this.http.post<RegisterResponse>(
      `${this.apiUrl}/register`,
      data
    );

  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('role');

  }

  isLoggedIn(): boolean {

    return localStorage.getItem('token') !== null;

  }

  getToken(): string | null {

    return localStorage.getItem('token');

  }

}