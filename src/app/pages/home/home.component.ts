import { Component, Injector, OnChanges, OnInit, SimpleChanges, effect, inject, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  private _task = inject(TaskService);
  tasks = this._task.tasks;

  titleControl = new FormControl("", {
    nonNullable: false,
    validators: [Validators.required]
  })

  injector = inject(Injector);

  constructor() { }

  ngOnInit(): void {
    this._task.get()
  }

  addTask(): void {
    if(this.titleControl.valid) {
      this._task.add(this.titleControl.value || "");
      this.titleControl.setValue("");
    }
  }

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
    this._task.update(index, inputElement.value);
  }

  deleteTask(position: number) {
    this._task.delete(position);
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
