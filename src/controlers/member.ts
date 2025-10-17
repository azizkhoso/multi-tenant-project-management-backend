import { Request, Response } from "express";

import { createUserSchema } from "../types/schemas";
import { createMember, getMemberById as getById } from "../services/member.service";
import Exception from "../utils/Exception";

export async function newMember(req: Request, res: Response) {
  const data = createUserSchema.validateSync(req.body);
  const user = await createMember(data);
  res.json({ member: user });
}

export async function getMemberById(req: Request, res: Response) {
  const { id } = req.params;
  const user = await getById(id);
  if (!user) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'Member' } });
  res.json({ member: user });
}