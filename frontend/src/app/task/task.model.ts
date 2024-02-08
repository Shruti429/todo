export interface Task {
    _id?: string; // Optional if you are using MongoDB ObjectId
    title: string;
    description?: string;
    dueDate: string; // Use Date type if you want to work with dates
    priority: 'low' | 'medium' | 'high';
    status: 'to-do' | 'in-progress' | 'completed';
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  