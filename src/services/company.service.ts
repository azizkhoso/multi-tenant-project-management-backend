import { ICompany } from "../types";
import Company from "../models/Company";

// CRUD operations for Company

export async function getCompanyById(id: string) {
  const company = await Company.findByPk(id);
  return company;
}

export async function listCompanies() {
  const companies = await Company.findAll();
  return companies;
}

export async function createCompany(data: Omit<ICompany & { isVerified?: boolean }, 'id' | 'createdAt' | 'updatedAt'>) {
  // Implementation for creating a company
  const company = await Company.create({ ...data });
  return company;
}

export async function updateCompany(id: string, data: Partial<Omit<ICompany, 'id' | 'createdAt' | 'updatedAt'>>) {
  const company = await Company.findByPk(id);
  if (!company) return null;
  const updated = await company.update(data);
  return updated;
}

export async function deleteCompany(id: string) {
  const company = await Company.findByPk(id);
  if (!company) return false;
  await company.destroy();
  return true;
}
