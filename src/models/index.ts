import sequelize from '../config/database';
import UserModel from './User';
import CompanyModel from './Company';
import FileModel from './File';
import ProjectModel from './Project';
import TaskModel from './Task';
import TimeSheetEntryModel from './TimeSheetEntry';
import CommentModel from './Comment';
import ActivityModel from './Activity';
import ProjectAssigneeModel from './ProjectAssignee';
import ProjectAttachment from './ProjectAttachment';
import TaskAssigneeModel from './TaskAssignee';
import TaskAttachment from './TaskAttachment';

import getEnv from '../utils/getEnv';

// Initialize models
UserModel.initialize(sequelize);
CompanyModel.initialize(sequelize);
FileModel.initialize(sequelize);
ProjectModel.initialize(sequelize);
TaskModel.initialize(sequelize);
TimeSheetEntryModel.initialize(sequelize);
CommentModel.initialize(sequelize);
ActivityModel.initialize(sequelize);
ProjectAssigneeModel.initialize(sequelize);
ProjectAttachment.initialize(sequelize);
TaskAssigneeModel.initialize(sequelize);
TaskAttachment.initialize(sequelize);

// Define associations using correct foreign keys
CompanyModel.hasMany(UserModel, { foreignKey: 'company' });
UserModel.belongsTo(CompanyModel, { foreignKey: 'company' });

CompanyModel.hasMany(ProjectModel, { foreignKey: 'company' });
ProjectModel.belongsTo(CompanyModel, { foreignKey: 'company' });

ProjectModel.hasMany(TaskModel, { foreignKey: 'project' });
TaskModel.belongsTo(ProjectModel, { foreignKey: 'project' });

TaskModel.hasMany(TimeSheetEntryModel, { foreignKey: 'task' });
TimeSheetEntryModel.belongsTo(TaskModel, { foreignKey: 'task' });

TaskModel.hasMany(CommentModel, { foreignKey: 'task' });
CommentModel.belongsTo(TaskModel, { foreignKey: 'task' });

ProjectModel.hasMany(CommentModel, { foreignKey: 'project' });
CommentModel.belongsTo(ProjectModel, { foreignKey: 'project' });

ProjectModel.belongsToMany(UserModel, {
  through: ProjectAssigneeModel,
  as: 'assignees',
  foreignKey: 'project',
  otherKey: 'user',
});

ProjectModel.belongsToMany(FileModel, {
  through: ProjectAttachment,
  as: 'attachments',
  foreignKey: 'project',
  otherKey: 'file',
});

TaskModel.belongsToMany(UserModel, {
  through: TaskAssigneeModel,
  as: 'assignees',
  foreignKey: 'task',
  otherKey: 'user',
});

TaskModel.belongsToMany(FileModel, {
  through: TaskAttachment,
  as: 'attachments',
  foreignKey: 'task',
  otherKey: 'file',
});

UserModel.belongsToMany(ProjectModel, {
  through: ProjectAssigneeModel,
  as: 'projects',
  foreignKey: 'user',
  otherKey: 'project',
});

UserModel.belongsToMany(TaskModel, {
  through: TaskAssigneeModel,
  as: 'tasks',
  foreignKey: 'user',
  otherKey: 'task',
});

FileModel.belongsToMany(ProjectModel, {
  through: ProjectAttachment,
  as: 'projects',
  foreignKey: 'file',
  otherKey: 'project',
});

FileModel.belongsToMany(TaskModel, {
  through: TaskAttachment,
  as: 'tasks',
  foreignKey: 'file',
  otherKey: 'task',
});

// sync to database
export async function syncDb() {
  return await sequelize.sync({ alter: getEnv('NODE_ENV') === 'development' });
}

export {
  sequelize,
  UserModel,
  CompanyModel,
  FileModel,
  ProjectModel,
  TaskModel,
  TimeSheetEntryModel,
  CommentModel,
  ActivityModel,
};
