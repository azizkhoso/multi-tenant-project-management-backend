import { UserModel } from "../models";
import { IUser } from "../types";
import { createUserSchema } from "../types/schemas";

export async function getCompanyAdmins(companyId: string) {
  const admins = await UserModel.findAll({ where: { company: companyId, role: 'company_admin' } });
  return admins.map(admin => admin.toJSON());
}

export async function createCompanyAdmin(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'>) {
  const validated = createUserSchema.validateSync(data);
  const admin = await UserModel.create({ ...validated, role: 'company_admin' });
  return admin.toJSON();
}