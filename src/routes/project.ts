import express from 'express';

import * as controllers from '../controlers/project';
import authMiddleware from '../middlewares/auth';
import fileUploadMiddleware from '../middlewares/fileUpload';

const router = express.Router();

router.post('/', authMiddleware('company_admin'), fileUploadMiddleware.single('image'),  controllers.newProject);

router.get('/', authMiddleware('company_admin', 'member'), controllers.getProjects);

// router.get('/:id', authMiddleware('company_admin', 'member'), controllers.getMemberById);

// router.get('/:id/dashboard', authMiddleware('company_admin'), getCompanyDashboardController);

// router.put('/:id', authMiddleware('company_admin'), updateCompanyController)

export default router;
