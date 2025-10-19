import { Op } from 'sequelize';
import Project from '../models/Project';
import User from '../models/User';
import { IProject } from '../types';
import Exception from '../utils/Exception';
import { ProjectModel } from '../models';

export async function createProject(data: Pick<IProject, 'image' | 'company' | 'createdBy' | 'title' | 'description' | 'category' | 'dueDate'>) {
  const created = await Project.create({ ...data, status: 'todo' });
  return created.toJSON();
}

export async function getProjectById(id: string) {
  const prj = await Project.findByPk(id);
  if (!prj) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'Project' } });
  return prj.toJSON();
}

export async function getProjectsByCompany(
  company: string,
  filters?: { title?: string; sort?: { sortBy: string; order: 'ASC' | 'DESC' } }
) {
  const where: Record<string, any> = { company };

  if (filters?.title) {
    where.title = filters.title;
  }

  const order: Array<[string, 'ASC' | 'DESC']> = [];

  if (filters?.sort?.sortBy && filters?.sort?.order) {
    order.push([filters.sort.sortBy, filters.sort.order]);
  }

  const projects = await ProjectModel.findAll({
    where,
    order,
  });

  return projects;
}


export async function getProjectsByMember(
  company: string, member: string,
  filters?: { title?: string; sort?: { sortBy: string; order: 'ASC' | 'DESC' } }
) {
  const projectsWithAssignees = await ProjectModel.findAll({ where: { company }, include: ['assignees'] });
  // filter out those with assignee.id as member
  const filtered = projectsWithAssignees.filter((p) => p.assignees?.map(a => a.id).includes(member));

  const where: Record<string, any> = {};

  if (filters?.title) {
    where.title = filters.title;
  }

  const order: Array<[string, 'ASC' | 'DESC']> = [];

  if (filters?.sort?.sortBy && filters?.sort?.order) {
    order.push([filters.sort.sortBy, filters.sort.order]);
  }

  const projects = await ProjectModel.findAll({
    where: { ...where, id: { [Op.in]: filtered.map(p => p.id)  } },
    order,
  });

  return projects;
}

export async function updateProject(id: string, data: Partial<IProject>) {
  const project = await Project.findByPk(id);
  if (!project) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'Project' } });
  await project.update(data);
  return project;
}

export async function deleteProject(id: string) {
  const project = await Project.findByPk(id);
  if (!project) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'Project' } });
  await project.destroy();
  return true;
}

export async function addAssignee(projectId: string, userId: string) {
  const project = await Project.findByPk(projectId);
  const user = await User.findByPk(userId);
  if (!project) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'Project' } });
  if (!user) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'User' } });
  project.assignees = [...project.assignees, userId];
  return await project.save();
}

export async function removeAssignee(projectId: string, userId: string) {
  const project = await Project.findByPk(projectId);
  if (!project) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'Project' } });
  project.assignees = project.assignees.filter((id: string) => id !== userId);
  return await project.save();
}

export async function getProjectsByAssignee(userId: string) {
  return await Project.findAll({
    include: [{
      model: User,
      as: 'assignees',
      where: { id: userId }
    }]
  });
}

export async function searchProjects(title: string) {
  return await Project.findAll({
    where: {
      title: { [Op.iLike]: `%${title}%` }
    }
  });
}
