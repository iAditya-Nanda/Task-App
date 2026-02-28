import { Request, Response } from 'express';
import prisma from '../config/prisma.js';

interface AuthRequest extends Request {
    user?: { userId: string };
}

// Retrieve tasks for the logged-in user with support for search and pagination
export const getAllTasks = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId as string;
        const { page = 1, limit = 10, status, search } = req.query;

        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        const filter: any = { userId };

        if (status) {
            filter.status = status as string;
        }

        if (search) {
            filter.title = { contains: search as string, mode: 'insensitive' };
        }

        const [tasks, total] = await Promise.all([
            prisma.task.findMany({
                where: filter,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.task.count({ where: filter }),
        ]);

        res.json({
            tasks,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit)),
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
};

// Create a new task entry
export const createTask = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description } = req.body;
        const userId = req.user?.userId as string;

        if (!title) {
            return res.status(400).json({ message: 'Title field is required' });
        }

        const task = await prisma.task.create({
            data: { title, description, userId },
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create new task' });
    }
};

// Get a single task by its unique ID
export const getTaskById = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const userId = req.user?.userId as string;

        const task = await prisma.task.findFirst({
            where: { id, userId },
        });

        if (!task) {
            return res.status(404).json({ message: 'Task record not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving task details' });
    }
};

// Update an existing task's information
export const updateTask = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const userId = req.user?.userId as string;
        const { title, description, status } = req.body;

        const task = await prisma.task.findFirst({ where: { id, userId } });
        if (!task) return res.status(404).json({ message: 'Task record not found' });

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { title, description, status },
        });

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error while updating task' });
    }
};

// Toggle the completion status of a task
export const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const userId = req.user?.userId as string;

        const task = await prisma.task.findFirst({ where: { id, userId } });
        if (!task) return res.status(404).json({ message: 'Task record not found' });

        const newStatus = task.status === 'COMPLETED' ? 'OPEN' : 'COMPLETED';
        const updatedTask = await prisma.task.update({
            where: { id },
            data: { status: newStatus },
        });

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to toggle status' });
    }
};

// Remove a task permanently
export const deleteTask = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const userId = req.user?.userId as string;

        const task = await prisma.task.findFirst({ where: { id, userId } });
        if (!task) return res.status(404).json({ message: 'Task record not found' });

        await prisma.task.delete({ where: { id } });
        res.json({ message: 'Task successfully removed' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task' });
    }
};
