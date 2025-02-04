import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from '../../shared/models/Task';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DateValidators } from '../Validators/Date.validator';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edit-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent implements OnInit{
  @Output() addTask = new EventEmitter<Task>();

  editTaskForm: any;
  task: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = Number(params.get('id'));

      this.taskService.getTaskById(id).subscribe((task: Task) => {
        this.task = task;
        this.editTaskForm = new FormGroup({
          name: new FormControl(this.task.name, [
            Validators.required,
            Validators.maxLength(32),
          ]),
          description: new FormControl(this.task.description, [
            Validators.required,
            Validators.maxLength(255)
          ]),
          dueDate: new FormControl(this.task.dueDate.split('T')[0], [
            DateValidators.dateBeforeToday,
            DateValidators.validDate
          ])
        });
      });
      
    })
  }

  get name(): string {
    return this.editTaskForm.get('name')?.value || '';
  }

  get nameControl() {
    return this.editTaskForm.get('name');
  }

  get description(): string {
    return this.editTaskForm.get('description')?.value || '';
  }

  get descriptionControl() {
    return this.editTaskForm.get('description');
  }

  get dueDate(): string {
    return this.editTaskForm.get('dueDate')?.value || '';
  }

  get dueDateControl() {
    return this.editTaskForm.get('dueDate');
  }

  canExit(): boolean {
    if(this.editTaskForm.dirty) {
      if (confirm('Please confirm if you want to exit.')) {
        return true;
      }
      return false;
    }

    return true;
   }

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  getDateTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return tomorrow;
  }

  updateTask() {
    if (this.editTaskForm.valid) {
      let dateStr = this.dueDate === '' ? this.getDateTomorrow() : this.dueDate;

      this.task.description = this.description;
      this.task.name = this.name;
      this.task.dueDate = new Date(dateStr);
  
      this.taskService.updateTask(this.task).subscribe({
        next: (data) => {
          this.router.navigate(['/']);
        }
      });
    }

    
  }
}
