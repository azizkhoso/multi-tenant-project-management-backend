import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { IProject } from '../types';

type ProjectCreation = Pick<IProject, 'image' | 'createdBy' | 'title' | 'description' | 'category' | 'dueDate'>;

class Project extends Model<IProject, ProjectCreation> implements IProject {
  public id!: string;
  public title!: string;
  public category!: string;
  public description!: string;
  public dueDate!: Date;
  public image!: any; // Should be associated with IFile model
  public attachments!: any[]; // Should be associated with IFile model
  public createdBy!: any; // Should be associated with ICompanyAdmin or string
  public assignees!: any[]; // Should be associated with IMember[] or string[]
  public status!: 'todo' | 'continue' | 'completed' | 'overdue';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    Project.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        dueDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('todo', 'continue', 'completed', 'overdue'),
          allowNull: false,
        },
        assignees: {
          type: DataTypes.ARRAY(DataTypes.UUID),
          allowNull: false,
          defaultValue: [],
        },
        attachments: {
          type: DataTypes.ARRAY(DataTypes.UUID),
          allowNull: false,
          defaultValue: [],
        },
        image: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'files', key: 'id' },
        },
        createdBy: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'users', key: 'id' },
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        }
      },
      {
        sequelize,
        tableName: 'projects',
      }
    );
  }
}

export default Project;