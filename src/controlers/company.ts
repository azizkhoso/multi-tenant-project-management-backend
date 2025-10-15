import { Request, Response } from 'express';

import { registerCompanySchema } from '../types/schemas';
import { createCompany } from '../services/company.service';

export async function registerCompany (req: Request, res: Response) {
  // validate body
  const data = registerCompanySchema.validateSync(req.body, { stripUnknown: true });
  const created = await createCompany({ ...data, isVerified: true }); // TODO: false in production
  res.status(201).json({ company: created });
};