import express from 'express';

import { getCompanyByIdController, getCompanyDashboardController, registerCompany, updateCompanyController } from '../controlers/company';
import * as controllers from '../controlers/member';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.post('/', authMiddleware('company_admin'), controllers.newMember);

router.get('/:id', authMiddleware('company_admin', 'member'), controllers.getMemberById);

router.get('/:id/dashboard', authMiddleware('company_admin'), getCompanyDashboardController);

router.put('/:id', authMiddleware('company_admin'), updateCompanyController)

export default router;
