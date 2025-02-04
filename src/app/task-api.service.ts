import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Task } from '../shared/models/Task';
import { catchError, throwError, Observable } from 'rxjs';
import { TaskApiInterface } from './task-api-interface';

const db = "http://localhost:3000/tasks";

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  // Inject url here
  constructor(private http: HttpClient, @Inject('API_URL') private config: TaskApiInterface) { }

  private getStandardOptions() : any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  getTasks() {
    return this.http.get<Task[]>(this.config.url);
  }

  getTaskById(id: Number) {
    return this.http.get<Task>(this.config.url + `/${id}`)
  }

  addTask(task: Task) {
    // let options = this.getStandardOptions()
    // options.headers = options.set('Authorization', 'my-new-auth-token');
    return this.http.post<Task[]>(this.config.url, task);
  }

  updateTask(task: Task) {
    return this.http.put<Task>(this.config.url + `/${task.id}`, task);
  }

  deleteTask(id: Number) {
    return this.http.delete<Task>(this.config.url + `/${id}`);
  }
}
