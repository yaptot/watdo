import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../shared/models/Task';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tasks: Task[], mode: Number) {
    if (mode === 1) {
      return tasks.filter((task) => !task.isCompleted)
    }
    else if (mode === 2) {
      return tasks.filter ((task) => {
        const today = new Date();
        const taskDate = new Date(task.dueDate);

        return taskDate.getFullYear() === today.getFullYear() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getDate() === today.getDate();
      })
    }
    else if (mode === 3) {
      return tasks.filter((task) => task.isCompleted)
    }

    return tasks;
  }

}
