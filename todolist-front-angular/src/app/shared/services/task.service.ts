import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.apiUrl)
      .pipe(catchError(this.handleError('getTask', [])));
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(this.apiUrl, task)
      .pipe(catchError(this.handleError<Task>('addTask')));
  }

  updateTask(task: Task): Observable<any> {
    return this.http
      .put<Task>(`${this.apiUrl}/${task.id}`, task)
      .pipe(catchError(this.handleError<any>('updateTask')));
  }

  deleteTask(id: number): Observable<Task> {
    return this.http
      .delete<Task>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<Task>('delateTask')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
