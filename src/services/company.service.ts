import { ICompany, IUser } from "../types";
import { CompanyModel } from "../models";
import { createCompanyAdmin } from "./company-admin.service";
import { Sequelize } from "sequelize";
import Exception from "../utils/Exception";

// CRUD operations for Company

export async function getCompanyById(id: string) {
  const company = await CompanyModel.findByPk(id);
  return company?.toJSON();
}

export async function listCompanies() {
  const companies = await CompanyModel.findAll();
  return companies;
}

export async function createCompany(
  data: Omit<ICompany & { isVerified?: boolean }, 'id' | 'createdAt' | 'updatedAt'>,
  adminData: Omit<IUser, 'id' | 'company' | 'createdAt' | 'updatedAt' | 'role'>,
) {
  // Implementation for creating a company
  try {
    const company = await CompanyModel.create({ ...data });
    // create admin
    await createCompanyAdmin({ ...adminData, company: company.id });
    return company.toJSON();
  } catch (error) {
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      throw new Exception({ code: 'DUPLICATE_RESOURCE', data: { resource: 'Company' } });
    }
    else throw error;
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
