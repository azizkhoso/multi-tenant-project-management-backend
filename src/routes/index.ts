import express from 'express';

import authenticationRoutes from './authentication';
import companyRoutes from './company';

const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Welcome to the API' }));

router.use('/auth', authenticationRoutes);

router.use('/companies', companyRoutes)

export default router;
