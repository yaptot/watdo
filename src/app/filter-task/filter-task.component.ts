import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../shared/models/Task';

const filters = [
  (task : Task) => task,
  (task : Task) => !task.isCompleted,
  (task : Task) => {
    const today = new Date();
    const taskDate = new Date(task.dueDate);

    return taskDate.getFullYear() === today.getFullYear() &&
    taskDate.getMonth() === today.getMonth() &&
    taskDate.getDate() === today.getDate();
  },
  (task : Task) => task.isCompleted,
]

@Component({
  selector: 'filter-task',
  imports: [FormsModule],
  templateUrl: './filter-task.component.html',
  styleUrl: './filter-task.component.scss'
})
export class FilterTaskComponent implements OnInit {
  @Output() filter = new EventEmitter<any>();

  ngOnInit() : void {
    this.updateFilter('0')
  }

  listFilter : any = '0';

  updateFilter(value : any) {
    this.filter.emit(Number(value));
  }

}
