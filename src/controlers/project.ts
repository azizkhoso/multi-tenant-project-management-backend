import { Request, Response } from "express";
import * as yup from 'yup';

import { newProjectSchema } from "../types/schemas";
import { getProjectById as getById, getProjectsByCompany, getProjectsByMember } from "../services/project.service";
import { saveFile } from "../services/file.service";
import { createProject } from "../services/project.service";
import { IProject } from "../types";

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
    assignees: (data.assignees as string[]) || [],
  });
  res.json({ project: prj });
}

export async function getProjectById(req: Request, res: Response) {
  const { id } = req.params;
  const project = await getById(id);
  res.json({ project: project });
}

export async function getProjects(req: Request, res: Response) {
  // if company admin is rquesting show all, else only show members projects
  let projects: IProject[] = [];
  if (req.user!.role === 'company_admin') {
    projects = await getProjectsByCompany(req.user?.company!, {
      sort: {
        sortBy: req.query.sortBy as string,
        order: req.query.order ? (req.query.order as string).toUpperCase() as 'ASC' | 'DESC' : 'ASC',
      }
    });
  } else {
    projects = await getProjectsByMember(req.user?.company!, req.user!.id, {
      sort: {
        sortBy: req.query.sortBy as string,
        order: req.query.order ? (req.query.order as string).toUpperCase() as 'ASC' | 'DESC' : 'ASC',
      }
    });
  }
  res.json({ projects });
}