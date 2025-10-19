import { Request, Response } from "express";
import * as yup from 'yup';

import { createUserWithoutCompanySchema, newProjectSchema } from "../types/schemas";
import { createMember, getMemberById as getById, getMembersByCompany } from "../services/member.service";
import Exception from "../utils/Exception";
import { saveFile } from "../services/file.service";
import { createProject } from "../services/project.service";

export async function newProject(req: Request, res: Response) {
  const data = newProjectSchema.concat(yup.object({
    image: yup.string().required('Project thumbnail image is required')
  })).validateSync({ ...req.body, image: req.file?.originalname });
  // create image file record
  const fileRec = await saveFile(req.file?.originalname!, req.file!.mimetype, req.file!.buffer);
  const prj = await createProject({
    ...data,
    image: fileRec.id,
    company: req.user!.company!,
    createdBy: req.user?.id!,
  })
  res.json({ project: prj });
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