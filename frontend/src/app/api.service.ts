// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/endpoint`);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/endpoint`, data);
  }
  patch(data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/endpoint`, data);
  }
  delete(data: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/endpoint`);
  }
}

