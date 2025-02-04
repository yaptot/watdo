import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Task } from '../shared/models/Task';
import { TaskService } from './task.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskResolverService implements Resolve<Task[]> {
  constructor(private taskService: TaskService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
    return this.taskService.getTasks();
  }
}
