import { Injectable } from '@angular/core';
import { Task } from '../shared/models/Task';
import { TaskApiService } from './task-api.service';

const db = "http://localhost:3000/tasks";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private taskApiService: TaskApiService) { }

  private existingIds: Number[] = [];

  getTasks() {
    return this.taskApiService.getTasks();
  }

  populateExistingIds(tasks: Task[]) {
    this.existingIds.length = 0;
    
    tasks.forEach(task => {
      this.existingIds.push(task.id);
    });
  }

  getTaskById(id: Number) {
      return this.taskApiService.getTaskById(id);
  }

  private generateTaskId(): Number {
    return Math.max.apply(this.existingIds) + 1;
  }

  
  addTask(task: Task) {
    task.id = this.generateTaskId();

    return this.taskApiService.addTask(task);
  }

  updateTask(task: Task) {
    return this.taskApiService.updateTask(task);
  }

  deleteTask(id: Number) {
    return this.taskApiService.deleteTask(id);
  }
}
