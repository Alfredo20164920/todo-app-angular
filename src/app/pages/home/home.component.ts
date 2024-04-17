import { Component, Input, OnChanges, OnInit, SimpleChanges, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';

import { TaskListComponent } from '../../components/task-list/task-list.component';

import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

export enum Filters {
  COMPLETED = 'completed', 
  ALL = 'all',
  PENDING = 'pending'
}


@Component({
  selector: 'app-home',
  imports: [TaskListComponent, CommonModule],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnChanges {

  @Input() filter!: Filters;

  private _task = inject(TaskService);
  tasks = this._task.tasks;

  filterChange = signal<Filters>(Filters.ALL)

  filterTasks = computed( () => {
    const filter = this.filterChange();
    const tasks = this.tasks();

    const filterMap: Record<Filters, () => Task[]> = {
      [Filters.COMPLETED]: () => tasks.filter((item) => item.completed),
      [Filters.PENDING]: () => tasks.filter((item) => !item.completed),
      [Filters.ALL]: () => tasks
    }
    
    return filterMap[filter]();
  }); 

  ngOnInit(): void {
    this._task.get();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const filter = changes["filter"].currentValue;
    this.filterChange.set(filter);
    this._task.setFilterChange(filter);
    this._task.setFilterTasks(this.filterTasks())
  }
}
