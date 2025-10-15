import express from 'express';
import { registerCompany } from '../controlers/company';

const router = express.Router();

router.post('/register', registerCompany);

export default router;
