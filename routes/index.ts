import express from 'express';
import sessionRoutes from './sessionRoutes';
import todoRoutes from './todoRoutes';

const router = express.Router();

router.use('/', sessionRoutes);
router.use('/', todoRoutes);

export default router;
