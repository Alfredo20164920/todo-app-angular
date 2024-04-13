import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],  
  template: "<router-outlet/>"
})
export class AppComponent implements OnInit {
  private _task = inject(TaskService);
  tasks = this._task.tasks;
  
  ngOnInit(): void {
    this._task.get();
  }
}
