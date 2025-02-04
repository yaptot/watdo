import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuardService implements CanDeactivate<AddTaskFormComponent> {
   constructor(){}
 
   canDeactivate(component: AddTaskFormComponent,
                route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot,
                nextState: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        
        return component.canExit();
 
  }

  // add logic for canExit here instead of the component
}
