import { Op } from 'sequelize';
import Project from '../models/Project';
import User from '../models/User';
import { IProject } from '../types';
import Exception from '../utils/Exception';

export async function createProject(data: Pick<IProject, 'image' | 'company' | 'createdBy' | 'title' | 'description' | 'category' | 'dueDate'>) {
  const created = await Project.create({ ...data, status: 'todo' });
  return created.toJSON();
}

export async function getProjectById(id: string) {
  return await Project.findByPk(id);
}

export async function getAllProjects(filter: any = {}) {
  return await Project.findAll({
    where: { title: { [Op.iLike]: `%${filter.title || ''}%` }, category: { [Op.iLike]: `%${filter.category || ''}%` } },
    include: [{ model: User, as: 'assignees' }]
  });
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
