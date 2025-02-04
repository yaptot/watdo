import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../../shared/models/Task';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DateValidators } from '../Validators/Date.validator';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'add-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent {
  @Output() addTask = new EventEmitter<Task>();

  addTaskForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(32),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ]),
    dueDate: new FormControl(null, [
      DateValidators.dateBeforeToday,
      DateValidators.validDate
    ])
  });

  get name(): string {
    return this.addTaskForm.get('name')?.value || '';
  }

  get nameControl() {
    return this.addTaskForm.get('name');
  }

  get description(): string {
    return this.addTaskForm.get('description')?.value || '';
  }

  get descriptionControl() {
    return this.addTaskForm.get('description');
  }

  get dueDate(): string {
    return this.addTaskForm.get('dueDate')?.value || '';
  }

  get dueDateControl() {
    return this.addTaskForm.get('dueDate');
  }

  constructor(private taskService: TaskService, private router: Router) { }

  canExit(): boolean {
    if(this.addTaskForm.dirty) {
      if (confirm('Please confirm if you want to exit.')) {
        return true;
      }
      return false;
    }

    return true;
   }

  getDateTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return tomorrow;
  }
  
  addNewTask() {
    if (this.addTaskForm.valid) {
      let dateStr = this.dueDate === '' ? this.getDateTomorrow() : this.dueDate;

      let newTask: Task = {
        id: 999,
        name: this.name,
        description: this.description,
        dueDate: new Date(dateStr),
        isCompleted: false
      };
  
      this.taskService.addTask(newTask).subscribe({
        next: (data) => {
          this.router.navigate(['/']);
        }
      });
    }
  }
    
}
