import { Router } from 'express';
import {
    createTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    toggleTaskStatus,
    updateTask
} from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.js';
import { createTaskSchema, updateTaskSchema, validate } from '../middleware/validation.js';

const router = Router();

// Secure all task routes
router.use(authenticate);

// CRUD routes for user tasks
router.get('/', getAllTasks);
router.post('/', validate(createTaskSchema), createTask);
router.get('/:id', getTaskById);
router.patch('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleTaskStatus);

export default router;
