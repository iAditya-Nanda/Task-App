import { z } from 'zod';

// Schema for user registration and login
export const authSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
});

// Schema for creating a task
export const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
    description: z.string().max(500, 'Description too long').optional(),
});

// Schema for updating a task
export const updateTaskSchema = z.object({
    title: z.string().min(1, 'Title cannot be empty').max(100).optional(),
    description: z.string().max(500).optional(),
    status: z.enum(['OPEN', 'COMPLETED']).optional(),
});

import { Request, Response, NextFunction } from 'express';

// Middleware to validate request body against a schema
export const validate = (schema: z.ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: error.issues.map((issue) => ({
                        field: issue.path.join('.'),
                        message: issue.message
                    }))
                });
            }
            res.status(500).json({ message: 'Internal server error during validation' });
        }
    };
};
