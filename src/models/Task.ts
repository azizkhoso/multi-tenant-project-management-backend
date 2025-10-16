import { DataTypes, Model, Sequelize, Optional, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManySetAssociationsMixin, BelongsToManyRemoveAssociationMixin, Association } from 'sequelize';
import { IFile, IMember, ITask, IUser } from '../types';
import { FileModel, UserModel } from '.';

type TaskCreation = Optional<ITask, 'id' | 'hoursSpent' | 'status' | 'tags' | 'createdAt' | 'updatedAt'>;

class Task extends Model<ITask, TaskCreation> implements ITask {
  public id!: string;
  public project!: string;
  public title!: string;
  public description!: string;
  public dueDate!: Date;
  public createdBy!: string | IUser;
  public status!: 'todo' | 'continue' | 'completed' | 'overdue';
  public hoursSpent!: number;
  public tags!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

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
    assignees: Association<Task, UserModel>;
    attachments: Association<Task, FileModel>;
  };

  static initialize(sequelize: Sequelize) {
    Task.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        project: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'projects',
            key: 'id',
          },
        },
        title: {
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
        createdBy: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('todo', 'continue', 'completed', 'overdue'),
          allowNull: false,
          defaultValue: 'todo',
        },
        hoursSpent: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        tags: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
          defaultValue: [],
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
        },
      },
      {
        sequelize,
        tableName: 'tasks',
      }
    );
  }
}

export default Task;