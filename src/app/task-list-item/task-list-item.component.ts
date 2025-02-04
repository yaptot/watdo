import { Component, Input } from '@angular/core';
import { NgClass, DatePipe } from '@angular/common';
import { Task } from '../../shared/models/Task';
import { EventService } from '../../shared/services/EventService'
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'task-list-item',
  imports: [
    NgClass,
    DatePipe,
  ],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})
export class TaskListItemComponent {
  @Input() task!: Task;

  constructor(private events : EventService, private router: Router) { }

  get cssClasses() {
    return {'strikeout text-muted' : this.task.isCompleted}
  }

  toggleTaskStatus() {
    this.events.emit('updateTaskStatus', this.task)
  }

  deleteTask() {
    this.events.emit('deleteTask', this.task)
  }

  gotoEditTask() {
    this.router.navigate([`/edit/${this.task.id}`]);
  }
}
