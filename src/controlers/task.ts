import { Request, Response } from "express";
import * as yup from 'yup';

import { newTaskSchema } from "../types/schemas";
import { getTaskById as getById, getTasksByMember, getTasksByProject } from "../services/task.service";
import { saveFile } from "../services/file.service";
import { createTask } from "../services/task.service";
import { ITask } from "../types";

export async function newTask(req: Request, res: Response) {
  const data = newTaskSchema.validateSync(req.body);
  const prj = await createTask({
    ...data,
    createdBy: req.user?.id!,
    assignees: data.assignees as string[],
    tags: data.tags as string[],
  });
  res.json({ task: prj });
}

export async function getTaskById(req: Request, res: Response) {
  const { id } = req.params;
  const task = await getById(id);
  res.json({ task: task });
}

export async function getTasks(req: Request, res: Response) {
  // if company admin is rquesting show all, else only show members tasks
  let tasks: ITask[] = [];
  const projectId = req.params.projectId as string;
  if (req.user!.role === 'company_admin') {
    tasks = await getTasksByProject(projectId, {
      sort: {
        sortBy: req.query.sortBy as string,
        order: req.query.order ? (req.query.order as string).toUpperCase() as 'ASC' | 'DESC' : 'ASC',
      }
    });
  } else {
    tasks = await getTasksByMember(projectId, {
      sort: {
        sortBy: req.query.sortBy as string,
        order: req.query.order ? (req.query.order as string).toUpperCase() as 'ASC' | 'DESC' : 'ASC',
      }
    });
  }
  res.json({ tasks });
}