import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockTaskItems } from '../../../pages/work-manager/models/task-item.model';

export interface TaskItem {
  id: string;
  tasks: string[];
  todo: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // Method to return task items as an Observable
  getTasks(): Observable<TaskItem[]> {
    return of(MockTaskItems);
  }
  
}
