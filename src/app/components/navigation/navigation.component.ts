import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

export enum Filters {
  COMPLETED = 'completed', 
  ALL = 'all',
  PENDING = 'pending'
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent{


  private taskService = inject(TaskService);
  tasks = this.taskService.tasks;
  filterTasks = this.taskService.tasksFilter;
  filterChange = this.taskService.filterChange;

  handleClickCompleted() {
    console.log(1);
    this.taskService.deleteCompleted();
  }

}
