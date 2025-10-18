import type { Optional } from "sequelize";
import { UserModel } from "../models";
import { IUser } from "../types";
import Exception from "../utils/Exception";

export async function createMember(data: Optional<IUser, 'id' | 'role' | 'createdAt' | 'updatedAt'>) {
  try {
    const created = await UserModel.create({ ...data, role: 'member' });
    return created.toJSON() as (IUser & { role: 'member' });
  } catch (error) {
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      throw new Exception({ code: 'DUPLICATE_RESOURCE', data: { resource: 'Member' } });
    }
    else throw error;
  }
}

export async function getMemberById(id: string) {
  const user = await UserModel.findOne({ where: { role: 'member', id: id }, include: ['avatar'] });
  return user?.toJSON();
}

export async function getMembersByCompany(
  company: string,
  filters?: { fullName?: string; sort?: { sortBy: string; order: 'ASC' | 'DESC' } }
) {
  const where: Record<string, any> = { company, role: 'member' };

  if (filters?.fullName) {
    where.fullName = filters.fullName;
  }

  const order: Array<[string, 'ASC' | 'DESC']> = [];

  if (filters?.sort?.sortBy && filters?.sort?.order) {
    order.push([filters.sort.sortBy, filters.sort.order]);
  }

  const users = await UserModel.findAll({
    where,
    order,
  });

  return users;
}
