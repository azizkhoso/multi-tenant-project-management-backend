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