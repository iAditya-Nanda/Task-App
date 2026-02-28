import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Basic health check
app.get('/', (req, res) => {
    res.json({ message: 'Task API is running' });
});

export default app;
