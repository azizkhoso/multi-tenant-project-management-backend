import { ICompany, IUser } from "../types";
import { CompanyModel } from "../models";
import { createCompanyAdmin } from "./company-admin.service";
import Exception from "../utils/Exception";
import Company from "../models/Company";

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
  const transaction = await CompanyModel.sequelize?.transaction();
  let company: Company;
  try {
    // create sequelize transaction
    company = await CompanyModel.create({ ...data }, { transaction});
  } catch (error) {
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      throw new Exception({ code: 'DUPLICATE_RESOURCE', data: { resource: 'Company' } });
    }
    else throw error;
  }
  try {
    // create admin
    await createCompanyAdmin({ ...adminData, company: company.id }, transaction);
    return company.toJSON();
  } catch (error) {
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      throw new Exception({ code: 'DUPLICATE_RESOURCE', data: { resource: 'Admin' } });
    }
    else throw error;
  }
}

export async function updateCompany(id: string, data: Partial<Omit<ICompany, 'id' | 'createdAt' | 'updatedAt'>>) {
  const company = await CompanyModel.findByPk(id);
  if (!company) return null;
  const updated = await company.update(data);
  return updated.toJSON();
}

export async function deleteCompany(id: string) {
  const company = await CompanyModel.findByPk(id);
  if (!company) return false;
  await company.destroy();
  return true;
}
