import { Request, Response } from "express";

import { createUserWithoutCompanySchema } from "../types/schemas";
import { createMember, getMemberById as getById, getMembersByCompany } from "../services/member.service";
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

export async function getMembers(req: Request, res: Response) {
  const members = await getMembersByCompany(req.user?.company!, {
    sort: {
      sortBy: req.query.sortBy as string,
      order: req.query.order ? (req.query.order as string).toUpperCase() as 'ASC' | 'DESC' : 'ASC',
    }
  });
  res.json({ members });
}