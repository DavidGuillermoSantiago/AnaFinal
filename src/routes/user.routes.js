import { Router } from 'express';
import { createUser } from '../controllers/user.controller.js';
import { signin } from '../controllers/auth.controller.js';
import { getUserById } from '../controllers/user.controller.js';

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/register', createUser);
router.post('/signin', signin);
router.get('/:userId', getUserById);

export default router;
