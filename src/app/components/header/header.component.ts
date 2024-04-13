import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private taskService = inject(TaskService);

  titleControl = new FormControl("", {
    nonNullable: false,
    validators: [Validators.required]
  })

  addTaskHandler(): void {
    if(this.titleControl.valid) {
      this.taskService.add(this.titleControl.value || "");
      this.titleControl.setValue("");
    }
  }
}
