//task-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({})

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {}
       
  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['low', Validators.required],
      status: ['to-do', Validators.required],
    });
  }

  // onSubmit() {
  //   if (this.taskForm.valid) {
  //     this.taskService.addTask(this.taskForm.value).subscribe(() => {
  //       // Task added successfully, you can navigate to the task list or perform other actions.
  //     });
  //   }
  // }
  // onSubmit() {
  //   if (this.taskForm.valid) {
  //     this.taskService.addTask(this.taskForm.value).subscribe(
  //       () => {
  //         // Task added successfully, you can navigate to the task list or perform other actions.
  //       },
  //       (error) => {
  //         console.error('Error adding task:', error);
  //       }
  //     );
  //   }
  // }
 
  // onSubmit() {
  //   if (this.taskForm.valid) {
  //     console.log(this.taskForm.value); // Log the form data
  //     const taskData = { ...this.taskForm.value, dueDate: new Date(this.taskForm.value.dueDate) };
  //     this.taskService.addTask(taskData).subscribe(
  //       () => {
  //         // Task added successfully, you can navigate to the task list or perform other actions.
  //       },
  //       (error) => {
  //         console.error('Error adding task:', error);
  //       }
  //     );
  //   }
  // }
  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = { ...this.taskForm.value, dueDate: new Date(this.taskForm.value.dueDate) };
      this.taskService.addTask(taskData).subscribe(
        () => {
          // Task added successfully, you can navigate to the task list or perform other actions.
        },
        (error) => {
          console.error('Error adding task:', error);
          if (error instanceof HttpErrorResponse) {
            console.error('Server error:', error.error);
          }
        }
      );
    }
  }
  
  
  
  
}
