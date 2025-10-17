import express from 'express';
import { getCompanyByIdController, getCompanyDashboardController, registerCompany, updateCompanyController } from '../controlers/company';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.post('/register', registerCompany);

router.get('/:id', getCompanyByIdController);

router.get('/:id/dashboard', authMiddleware('company_admin'), getCompanyDashboardController);

router.put('/:id', authMiddleware('superadmin', 'company_admin'), updateCompanyController)

export default router;
