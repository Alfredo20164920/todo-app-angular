import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';

import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  selector: 'app-home',
  imports: [TaskListComponent],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {

  private _task = inject(TaskService);
  tasks = this._task.tasks;

}
