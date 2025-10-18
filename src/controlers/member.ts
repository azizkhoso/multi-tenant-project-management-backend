import { Request, Response } from "express";

import { createUserWithoutCompanySchema } from "../types/schemas";
import { createMember, getMemberById as getById } from "../services/member.service";
import Exception from "../utils/Exception";

export async function newMember(req: Request, res: Response) {
  const data = createUserWithoutCompanySchema.validateSync(req.body);
  const user = await createMember({ ...data, company: req.user!.company! });
  res.json({ member: user });
}

export async function getMemberById(req: Request, res: Response) {
  const { id } = req.params;
  const user = await getById(id);
  if (!user) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'Member' } });
  res.json({ member: user });
}