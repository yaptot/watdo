import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterLink, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { filter } from 'rxjs';
import { Task } from '../shared/models/Task';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    FormsModule,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  currentUrl = '';
  constructor(private taskService: TaskService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
    });
  }

  gotoAddTask() {
    this.router.navigate(['add']);
  }

  // Event handler to add a new task
  onAddTask(newTask: Task): void {
  }

  title = 'Wat Do?';
}
