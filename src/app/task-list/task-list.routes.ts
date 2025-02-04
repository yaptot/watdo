import { Routes } from "@angular/router";
import { TaskListComponent } from "./task-list.component";
import { AddTaskFormComponent } from "../add-task-form/add-task-form.component";
import { EditTaskFormComponent } from "../edit-task-form/edit-task-form.component";
import { DeactivateGuardService } from "../deactivate-guard.service";
import { TaskResolverService } from "../task-resolver.service";

export const taskListRoutes: Routes = [
    { path: '', pathMatch: 'full', component: TaskListComponent, resolve: { tasks: TaskResolverService } },
    { path: 'add', pathMatch: 'full', component: AddTaskFormComponent, canDeactivate: [DeactivateGuardService] },
    { path: 'edit/:id', pathMatch: 'full', component: EditTaskFormComponent, canDeactivate: [DeactivateGuardService] },
]