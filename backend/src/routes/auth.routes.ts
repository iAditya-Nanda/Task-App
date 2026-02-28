import { Router } from 'express';
import { login, logout, refresh, register } from '../controllers/auth.controller.js';
import { authSchema, validate } from '../middleware/validation.js';

const router = Router();

// Auth endpoints
router.post('/register', validate(authSchema), register);
router.post('/login', validate(authSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
