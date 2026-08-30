import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/profile';

  constructor(
    private http: HttpClient
  ) {}

  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token') || '';

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProfile(): Observable<any> {

    return this.http.get<any>(
      this.apiUrl,
      {
        headers: this.getHeaders()
      }
    );
  }

  updateProfile(
    data: {
      name?: string;
      email?: string;
      age?: number;
      avatar?: string;
    }
  ): Observable<any> {

    return this.http.put<any>(
      this.apiUrl,
      data,
      {
        headers: this.getHeaders()
      }
    );
  }

  changePassword(
    data: {
      oldPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    }
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/password`,
      data,
      {
        headers: this.getHeaders()
      }
    );
  }
}