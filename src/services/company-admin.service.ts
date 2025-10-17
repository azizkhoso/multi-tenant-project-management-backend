import bcrypt from 'bcrypt';

import { UserModel } from "../models";
import { IUser } from "../types";
import { createUserSchema } from "../types/schemas";

export async function getCompanyAdmins(companyId: string) {
  const admins = await UserModel.findAll({ where: { company: companyId, role: 'company_admin' } });
  return admins.map(admin => admin.toJSON());
}

export async function createCompanyAdmin(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'>) {
  const validated = createUserSchema.validateSync(data);
  const hashed = await bcrypt.hash(data.password, 8);
  const admin = await UserModel.create({ ...validated, password: hashed, role: 'company_admin' });
  return admin.toJSON();
}