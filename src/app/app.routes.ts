import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./task-list/task-list.routes').then(m => m.taskListRoutes) },
    { path: '**', pathMatch: 'full',component: NotFoundComponent }
];
