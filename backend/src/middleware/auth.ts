import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: any;
}

// Global authentication middleware to check JWT tokens
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Auth token missing or invalid format' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Session expired or invalid token' });
    }
};
