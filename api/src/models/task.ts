// models/task.ts

import mongoose, { Document } from 'mongoose';

interface TaskModel extends Document {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  status?: 'to-do' | 'in-progress' | 'completed';
  historyLogs?: string[];
}

const taskSchema = new mongoose.Schema<TaskModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
    },
    status: {
      type: String,
      enum: ['to-do', 'in-progress', 'completed'],
      default: 'to-do',
    },
    historyLogs: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<TaskModel>('Task', taskSchema);

export = Task;
