import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  tasks = this.taskService.tasks;

  @Input() tasksList!: Task[];

  toggleCompleted(index: number): void {
    this.tasks.update( (tasks: Task[]) => {
      return tasks.map((item, i) => {
        if(index == i) {
          return {
            ...item,
            completed: !item.completed
          }
        }

        return item
      })
    })
  }

  editingMode(index: number): void {
    if(this.tasks()[index].completed) return;

    this.tasks.update( (tasks: Task[]) => {
      return tasks.map((item, i) => {
        if(index == i) {
          return {
            ...item,
            editing: true,
          }
        }

        return {
          ...item,
          editing: false
        }
      })
    })
  }

  updateTask(e: Event, index: number): void {
    const inputElement = e.target as HTMLInputElement;
    this.taskService.update(index, inputElement.value);
  }

  deleteTask(position: number) {
    this.taskService.delete(position);
  }

  formatTask(title: string | null): string {
    return title?.trim() || "";
  }

  exitEditingMode() {
    this.tasks.update( (tasks: Task[]) => {
      return tasks.map((item, i) => {
        return {
          ...item,
          editing: false
        }
      })
    })
  }
}