import type { Request, Response } from 'express';

import { createUserWithoutCompanySchema, registerCompanySchema, updateCompanySchema } from '../types/schemas';
import { createCompany, getCompanyById, updateCompany } from '../services/company.service';
import Exception from '../utils/Exception';

export async function registerCompany(req: Request, res: Response) {
  // validate body
  const data = registerCompanySchema.validateSync(req.body.company, { stripUnknown: true });
  const adminData = createUserWithoutCompanySchema.validateSync(req.body.admin, { stripUnknown: true });
  const created = await createCompany({ ...data, isVerified: true }, adminData); // TODO: false in production
  res.status(201).json({ company: created, admin: adminData });
};

export async function getCompanyByIdController(req: Request, res: Response) {
  const { id } = req.params;
  const company = await getCompanyById(id);
  if (!company) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'company' } });
  res.json({ company });
}

export async function getCompanyDashboardController(req: Request, res: Response) {
  const { id } = req.params;
  const company = await getCompanyById(id);
  if (!company) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'company' } });
  res.json({ company });
}

export async function updateCompanyController(req: Request, res: Response) {
  const { id } = req.params;
  const company = await getCompanyById(id);
  if (!company) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'company' } });
  if (req.user?.company !== company.id) throw new Exception({ code: 'UNAUTHORIZED' });
  const updateData = updateCompanySchema.validateSync(req.body);
  const updated = await updateCompany(company.id, updateData);
  res.json({ company: updated });
}