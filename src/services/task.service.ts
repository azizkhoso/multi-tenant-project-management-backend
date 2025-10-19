import { Op } from 'sequelize';
import Task from '../models/Task';
import User from '../models/User';
import { ITask } from '../types';
import Exception from '../utils/Exception';
import { TaskModel } from '../models';

export async function createTask(data: Pick<ITask & { assignees?: string[] }, 'createdBy' | 'title' | 'dueDate' | 'assignees' | 'description' | 'project' | 'tags'>) {
  const transaction = await Task.sequelize?.transaction();
  const created = await Task.create({ ...data, status: 'todo' }, { transaction });
  // add assignees
  if (data.assignees && data.assignees.length > 0) {
    await created.addAssignees(data.assignees, { transaction });
  }
  await transaction?.commit();
  return created.toJSON();
}

export async function getTaskById(id: string) {
  const prj = await Task.findByPk(id);
  if (!prj) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'Task' } });
  return prj.toJSON();
}

export async function getTasksByProject(
  project: string,
  filters?: { title?: string; sort?: { sortBy: string; order: 'ASC' | 'DESC' } }
) {
  const where: Record<string, any> = { project };

  if (filters?.title) {
    where.title = filters.title;
  }

  const order: Array<[string, 'ASC' | 'DESC']> = [];

  if (filters?.sort?.sortBy && filters?.sort?.order) {
    order.push([filters.sort.sortBy, filters.sort.order]);
  }

  const tasks = await TaskModel.findAll({
    where,
    order,
    include: ['assignees']
  });

  return tasks;
}


export async function getTasksByMember(
  member: string,
  filters?: { title?: string; sort?: { sortBy: string; order: 'ASC' | 'DESC' } }
) {
  const tasksWithAssignees = await TaskModel.findAll({ include: ['assignees'] });
  // filter out those with assignee.id as member
  const filtered = tasksWithAssignees.filter((p) => p.assignees?.map(a => a.id).includes(member));

  const where: Record<string, any> = {};

  if (filters?.title) {
    where.title = filters.title;
  }

  const order: Array<[string, 'ASC' | 'DESC']> = [];

  if (filters?.sort?.sortBy && filters?.sort?.order) {
    order.push([filters.sort.sortBy, filters.sort.order]);
  }

  const tasks = await TaskModel.findAll({
    where: { ...where, id: { [Op.in]: filtered.map(p => p.id) } },
    order,
  });

  return tasks;
}

export async function updateTask(id: string, data: Partial<ITask>) {
  const task = await Task.findByPk(id);
  if (!task) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'Task' } });
  await task.update(data);
  return task;
}

export async function deleteTask(id: string) {
  const task = await Task.findByPk(id);
  if (!task) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'Task' } });
  await task.destroy();
  return true;
}

export async function addAssignee(taskId: string, userId: string) {

}

export async function removeAssignee(taskId: string, userId: string) {

}

export async function getTasksByAssignee(userId: string) {
  return await Task.findAll({
    include: [{
      model: User,
      as: 'assignees',
      where: { id: userId }
    }]
  });
}

export async function searchTasks(title: string) {
  return await Task.findAll({
    where: {
      title: { [Op.iLike]: `%${title}%` }
    }
  });
}
