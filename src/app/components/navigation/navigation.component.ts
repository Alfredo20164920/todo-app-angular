import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  private taskService = inject(TaskService);
  tasks = this.taskService.tasks;
}
