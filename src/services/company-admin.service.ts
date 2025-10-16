import { UserModel } from "../models";
import { IUser } from "../types";

export async function getCompanyAdmins(companyId: string) {
  const admins = await UserModel.findAll({ where: { company: companyId, role: 'company_admin' } });
  return admins.map(admin => admin.toJSON());
}

export async function createCompanyAdmin(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'>) {
  const admin = await UserModel.create({ ...data, role: 'company_admin' });
  return admin.toJSON();
}