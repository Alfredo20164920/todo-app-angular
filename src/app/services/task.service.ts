import { Injectable, Injector, effect, inject, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = signal<Task[]>([]);
  injector = inject(Injector);
  constructor() { }

  get() {
    const st = localStorage.getItem("mydayapp-angular");

    if(st) {
      const tasks = JSON.parse(st);
      this.tasks.set(tasks);
    }

    this.trackTasks();
  }

  trackTasks(): void {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem("mydayapp-angular", JSON.stringify(tasks));
    }, {injector: this.injector});
  }

  add(title: string) {

    const newTitle = this.formatTask(title);

    if(title !== "") {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTitle,
        completed: false
      }
  
      this.tasks.update((prev) => [...prev, newTask]);
    }

  }

  update(index: number, title: string) {

    const newTitle = this.formatTask(title);
    if(newTitle !== "") {
      this.tasks.update( (tasks: Task[]) => {
        return tasks.map((item, i) => {
          if(index == i) {
            return {
              ...item,
              editing: false,
              title: newTitle
            }
          }
  
          return item
        })
      })
    }
  }

  delete(position: number) {
    this.tasks.update((tasks: Task[]) => tasks.filter((tasks, index) => position !== index))
  
  }

  formatTask(title: string | null): string {
    return title?.trim() || "";
  }

}
