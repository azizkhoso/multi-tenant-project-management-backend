import express from 'express';

import authenticationRoutes from './authentication';
import companyRoutes from './company';
import memberRoutes from './member';
import projectRoutes from './project';
import fileRoutes from './file';
import taskRoutes from './task';

const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Welcome to the API' }));

router.use('/auth', authenticationRoutes);

router.use('/companies', companyRoutes);

router.use('/members', memberRoutes);

router.use('/projects', projectRoutes);

router.use('/tasks', taskRoutes);

router.use('/files', fileRoutes);

export default router;
