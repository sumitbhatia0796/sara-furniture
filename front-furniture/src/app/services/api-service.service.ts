import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  readonly Root_URL;

  constructor(private http: HttpClient) {
    this.Root_URL = 'http://localhost:3000';
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  get(url: string, params?: any): Observable<any> {
    return this.http.get(`${this.Root_URL}/api/v1/${url}`, { headers: this.getHeaders() , params: params});
  }

  post(url: string, payload: object): Observable<any> {
    return this.http.post(`${this.Root_URL}/api/v1/${url}`, payload, { headers: this.getHeaders() });
  }

  patch(url: string, payload: object): Observable<any> {
    return this.http.patch(`${this.Root_URL}/api/v1/${url}`, payload, { headers: this.getHeaders() });
  }

  delete(url: string): Observable<any> {
    return this.http.delete(`${this.Root_URL}/api/v1/${url}`, { headers: this.getHeaders() });
  }

  private getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : ''; // Return empty string if token is null
  }
}
