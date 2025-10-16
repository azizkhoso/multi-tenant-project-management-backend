import type { Request, Response } from 'express';

import { registerCompanySchema } from '../types/schemas';
import { createCompany, getCompanyById } from '../services/company.service';
import Exception from '../utils/Exception';

export async function registerCompany(req: Request, res: Response) {
  // validate body
  const data = registerCompanySchema.validateSync(req.body, { stripUnknown: true });
  const created = await createCompany({ ...data, isVerified: true }); // TODO: false in production
  // create company admin
  
  res.status(201).json({ company: created });
};

export async function getCompany(req: Request, res: Response) {
  const { id } = req.params;
  const company = await getCompanyById(id);
  if (!company) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'company' } });
  res.json({ company });
}