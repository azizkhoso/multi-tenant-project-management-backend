import { DataTypes, Model, Sequelize, Optional, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManySetAssociationsMixin, BelongsToManyRemoveAssociationMixin, Association } from 'sequelize';
import { ICompany, IFile, IMember, IProject } from '../types';
import { FileModel, UserModel } from '.';

type ProjectCreation = Pick<IProject, 'company' | 'status' | 'image' | 'createdBy' | 'title' | 'description' | 'category' | 'dueDate'>;

class Project extends Model<IProject, ProjectCreation> implements IProject {
  public id!: string;
  public company!: string | ICompany;
  public title!: string;
  public category!: string;
  public description!: string;
  public dueDate!: Date;
  public createdBy!: any; // Should be associated with ICompanyAdmin or string
  public status!: 'todo' | 'continue' | 'completed' | 'overdue';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  public image!: string | IFile; // Should be associated with IFile model
  public attachments?: IFile[]; // Should be associated with IFile model
  public assignees?: IMember[]; // Should be associated with IMember[] or string[]
  // ✅ Mixin methods from Sequelize
  public getAssignees!: BelongsToManyGetAssociationsMixin<UserModel>;
  public addAssignee!: BelongsToManyAddAssociationMixin<UserModel, string>;
  public addAssignees!: BelongsToManyAddAssociationMixin<UserModel[], string[]>;
  public setAssignees!: BelongsToManySetAssociationsMixin<UserModel, string>;
  public removeAssignee!: BelongsToManyRemoveAssociationMixin<UserModel, string>;

  // Optional: association metadata for TypeScript
  public static associations: {
    assignees: Association<Project, UserModel>;
    attachments: Association<Project, FileModel>;
  };

  static initialize(sequelize: Sequelize) {
    Project.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        company: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'companies', key: 'id' },
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
        image: {
          type: DataTypes.UUID,
          allowNull: false,
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