import type { Optional } from "sequelize";
import { UserModel } from "../models";
import { IUser } from "../types";

export async function createMember(data: Optional<IUser, 'id' | 'role' | 'createdAt' | 'updatedAt'>) {
  const created = await UserModel.create({ ...data, role: 'member' });
  return created.toJSON() as (IUser & { role: 'member' });
}

export async function getMemberById(id: string) {
  const user = await UserModel.findOne({ where: { role: 'member', id: id }, include: ['avatar'] });
  return user?.toJSON();
}