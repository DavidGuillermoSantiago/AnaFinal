import { Router } from 'express';
import { createUser } from '../controllers/user.controller.js';
import { signin } from '../controllers/auth.controller.js';

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/register', createUser);
router.post('/signin', signin); // Corregido el método aquí

export default router;
