import { sequelize } from '../config/database';
import UserModel from './User';
import CompanyModel from './Company';
import FileModel from './File';
import ProjectModel from './Project';
import TaskModel from './Task';
import TimeSheetEntryModel from './TimeSheetEntry';
import CommentModel from './Comment';
import ActivityModel from './Activity';


// Initialize models
UserModel.initialize(sequelize);
CompanyModel.initialize(sequelize);
FileModel.initialize(sequelize);
ProjectModel.initialize(sequelize);
TaskModel.initialize(sequelize);
TimeSheetEntryModel.initialize(sequelize);
CommentModel.initialize(sequelize);
ActivityModel.initialize(sequelize);


// Define associations (simplified)
CompanyModel.hasMany(UserModel, { foreignKey: 'companyId' });
UserModel.belongsTo(CompanyModel, { foreignKey: 'companyId' });


CompanyModel.hasMany(ProjectModel, { foreignKey: 'companyId' });
ProjectModel.belongsTo(CompanyModel, { foreignKey: 'companyId' });


ProjectModel.hasMany(TaskModel, { foreignKey: 'projectId' });
TaskModel.belongsTo(ProjectModel, { foreignKey: 'projectId' });


TaskModel.hasMany(TimeSheetEntryModel, { foreignKey: 'taskId' });
TimeSheetEntryModel.belongsTo(TaskModel, { foreignKey: 'taskId' });


TaskModel.hasMany(CommentModel, { foreignKey: 'taskId' });
CommentModel.belongsTo(TaskModel, { foreignKey: 'taskId' });


ProjectModel.hasMany(CommentModel, { foreignKey: 'projectId' });
CommentModel.belongsTo(ProjectModel, { foreignKey: 'projectId' });


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