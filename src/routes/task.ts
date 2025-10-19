import express from 'express';

import * as controllers from '../controlers/task';
import authMiddleware from '../middlewares/auth';
import fileUploadMiddleware from '../middlewares/fileUpload';

const router = express.Router();

router.post('/', authMiddleware('company_admin'), fileUploadMiddleware.single('image'),  controllers.newTask);

router.put('/:id', authMiddleware('company_admin', 'member'), controllers.updateTask);

router.get('/by-project/:projectId', authMiddleware('company_admin', 'member'), controllers.getTasks);

export default router;
