import { Component, Input, OnChanges, OnDestroy, OnInit, Output, output } from '@angular/core';
import { Task } from '../../shared/models/Task';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import { EventService } from '../../shared/services/EventService';
import { TaskService } from '../task.service';
import { FilterTaskComponent } from "../filter-task/filter-task.component";
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../Pipes/filter.pipe';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const today = new Date();

@Component({
  selector: 'task-list',
  imports: [TaskListItemComponent, FilterTaskComponent, CommonModule, FilterPipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy{
  @Input() filter : any = () => {};
  tasks : Task[]  = [];
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.tasks = this.route.snapshot.data['tasks'];

    let deleteEvent = this.events.listen('deleteTask', (task: Task) => {
      console.log('delete ', task)
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.loadTasks();
      });
    })

    let updateEvent = this.events.listen('updateTaskStatus', (task: Task) => {
      task.isCompleted = !task.isCompleted;
      console.log('update ', task);
      this.taskService.updateTask(task).subscribe(() => {
        this.loadTasks();
      });
    });

    this.subscriptions.push(deleteEvent);
    this.subscriptions.push(updateEvent);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  constructor(private events: EventService, private taskService: TaskService, private route: ActivatedRoute) {
    
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.taskService.populateExistingIds(this.tasks);
    });
  }
  

}
