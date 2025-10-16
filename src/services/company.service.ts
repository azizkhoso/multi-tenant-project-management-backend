import { ICompany } from "../types";
import { CompanyModel } from "../models";

// CRUD operations for Company

export async function getCompanyById(id: string) {
  const company = await CompanyModel.findByPk(id);
  return company?.toJSON();
}

export async function listCompanies() {
  const companies = await CompanyModel.findAll();
  return companies;
}

export async function createCompany(data: Omit<ICompany & { isVerified?: boolean }, 'id' | 'createdAt' | 'updatedAt'>) {
  // Implementation for creating a company
  try {
    const company = await CompanyModel.create({ ...data });
    return company.toJSON();
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
}

export async function updateCompany(id: string, data: Partial<Omit<ICompany, 'id' | 'createdAt' | 'updatedAt'>>) {
  const company = await CompanyModel.findByPk(id);
  if (!company) return null;
  const updated = await company.update(data);
  return updated;
}

export async function deleteCompany(id: string) {
  const company = await CompanyModel.findByPk(id);
  if (!company) return false;
  await company.destroy();
  return true;
}
