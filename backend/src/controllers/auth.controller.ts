import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

// Function to create an access token for a user
const generateAccessToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
};

// Function to create a refresh token for long-term session
const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
};

// Logic for user registration
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        res.status(201).json({ message: 'Registration successful', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Error during registration process' });
    }
};

// Handle user sign in
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Authentication error' });
    }
};

// Generate a new access token using a refresh token
export const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is missing' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as any;
        const accessToken = generateAccessToken(decoded.userId);
        const newRefreshToken = generateRefreshToken(decoded.userId);

        res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid refresh token session' });
    }
};

// Log user out (stateless logic)
export const logout = (req: Request, res: Response) => {
    res.json({ message: 'Successfully logged out' });
};
