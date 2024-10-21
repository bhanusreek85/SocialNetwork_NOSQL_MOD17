import { Router } from 'express';
import {usersRouter } from './users.js';
// import { thoughtsRouter } from './thoughts.js';
const router = Router();
router.use('/users', usersRouter);
router.use('/thoughts', thoughtsRouter);
export default router;
