//task-list.component.ts
import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { NgForm } from '@angular/forms';
import { switchMap, of, catchError } from 'rxjs';
import { CsvService } from '../csv.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: any[] = [];
  selectedTask: any | null = null;
  isDetailsOpen: boolean = false;
  historyModalVisible = false;
  taskHistoryLogs: string[] = [];

  constructor(private taskService: TaskService,private csvService: CsvService) {
     this.loadTasks();
  }

  exportTasksToCsv() {
    this.taskService.getTasks().subscribe(
      (tasks: any) => {
        this.csvService.exportToCsv('tasks.csv', tasks);
      },
      (error: any) => {
        console.error('Error loading tasks for export:', error);
      }
    );
  } 
  
loadTasks() {
  this.taskService.getTasks().subscribe(
    (tasks: any) => {
      this.tasks = tasks;
    },
    (error: any) => {
      console.error('Error loading tasks:', error);
    }
  );
}

toggleDetails(task: any) {
  this.isDetailsOpen = !this.isDetailsOpen;
  this.selectedTask = this.isDetailsOpen ? task : null;
}
openHistoryModal() {
  console.log('Before Click - historyModalVisible:', this.historyModalVisible);
  this.fetchTaskHistoryLogs();
  console.log('After Click - historyModalVisible:', this.historyModalVisible);
}
closeHistoryModal() {
  console.log('Before Close - historyModalVisible:', this.historyModalVisible);
  this.historyModalVisible = false;
  console.log('After Close - historyModalVisible:', this.historyModalVisible);
}
fetchTaskHistoryLogs() {
 
}
//Deleting the Task  
deleteTask(task: Task) {
  if (task._id) {
    this.taskService.deleteTask(task._id).subscribe(() => {
      this.loadTasks(); // Reload tasks after deleting
    });
  }
}
//Sorting the Tasks
  sortByDueDate() {
    this.tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }
  sortByPriority() {
    this.tasks.sort((a, b) => a.priority.localeCompare(b.priority));
  }
  sortByStatus() {
    this.tasks.sort((a, b) => a.status.localeCompare(b.status));
  }


//update the task

updateTask(taskForm: NgForm, event: Event) {
  event.preventDefault();

  if (this.selectedTask && this.selectedTask._id) {
    try {
      console.log('Updating task:', this.selectedTask);

      // Update the task in the database
      this.taskService.updateTask(this.selectedTask._id, this.selectedTask)
        .pipe(
          switchMap((updatedTask: any) => {
            // Handle the actual updated task here
            console.log('Task updated successfully:', updatedTask);

            // Update the task in the local list
            const index = this.tasks.findIndex(task => task._id === updatedTask._id);
            if (index !== -1) {
              this.tasks[index] = updatedTask;
            }
            // Reset the form
            taskForm.resetForm();

            // Optionally, you can also reset the selectedTask
            this.selectedTask = null;

            return of(updatedTask); // Return an observable to keep the outer observable alive
          }),
          catchError((error: any) => {
            console.error('Error updating task:', error);
            // Handle the error, e.g., display an error message to the user
            // Consider creating a method to display error messages in a user-friendly way
            return of(null); // Returning of(null) to keep the observable alive (you can handle it in your subscription)
          })
        )
        .subscribe({
          next: (data: any) => {
            // success callback
            if (data !== null) {
              console.log('Task updated successfully:', data);
              // Optionally, display a success message to the user
            }
          },
          error: (error: any) => {
            console.error('Error updating task:', error);
            // Optionally, display an error message to the user
          }
        });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  } else {
    console.error('Selected task or its ID is undefined.');
  }
}

}




