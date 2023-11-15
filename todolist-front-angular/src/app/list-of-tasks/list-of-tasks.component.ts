import { Component } from '@angular/core';
import { Task } from '../shared/models/task';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-list-of-tasks',
  templateUrl: './list-of-tasks.component.html',
  styleUrls: ['./list-of-tasks.component.css'],
})
export class ListOfTasksComponent {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  isDone: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addTask(): void {
    const newTask = new Task(this.newTaskTitle, false);

    this.taskService.addTask(newTask).subscribe((response) => {
      window.location.reload();
      console.log('success', response);
    });
  }
  // updateTask(task: Task): void {
  //   task.isDone = true;
  //   this.taskService.updateTask(task).subscribe((response) => {
  //     console.log('Task updated successfully', response);
  //   });
  // }
  deleteTask(taskId: any): void {
    this.taskService.deleteTask(taskId).subscribe((response) => {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      console.log('success', response);
    });
  }
}
