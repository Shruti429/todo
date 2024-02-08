//task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) { }
  


  updateTask(taskId: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    console.log('Request Payload:', data);
    console.log('Request Headers:', headers);
  
    return this.http.put(url, data, { headers }).pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
  
  

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  getTaskById(id: string): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url);
  }
  addTask(task: Task): Observable<Task> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Task>(this.apiUrl, task, { headers });
  }

  deleteTask(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
