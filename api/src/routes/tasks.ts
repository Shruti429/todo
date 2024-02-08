// routes/tasks.ts

import express, { Request, Response } from 'express';
import Task from '../models/task';

const router = express.Router();

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a task
router.post('/', async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get task by ID
router.get('/:id', async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update task by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'dueDate', 'priority', 'status'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    console.log('Updates:', updates);
    console.log('isValidOperation:', isValidOperation);

    if (!isValidOperation) {
      console.log('Invalid updates!');
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    const _id = req.params.id;

    console.log('Task ID:', _id);
    console.log('Request Body:', req.body);

    const task = await Task.findOneAndUpdate({ _id }, req.body, { new: true, runValidators: true });

    if (!task) {
      console.log('Task not found!');
      return res.status(404).send();
    }

    console.log('Updated Task:', task);
    res.status(200).send(task);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).send(error);
  }
});

// Delete task by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get task history by ID
router.get('/:id/history', async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    // Fetch and send task history logs (replace with your actual implementation)
    const taskHistoryLogs = task.historyLogs || [];
    res.status(200).send(taskHistoryLogs);
  } catch (error) {
    res.status(500).send(error);
  }
});

export = router;
