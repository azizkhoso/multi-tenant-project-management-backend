import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { IMember, ITask, IUser } from '../types';

type TaskCreation = Optional<ITask, 'id' | 'assignees' | 'attachments' | 'hoursSpent' | 'status' | 'tags' | 'createdAt' | 'updatedAt'>;

class Task extends Model<ITask, TaskCreation> implements ITask {
  public id!: string;
  public project!: string;
  public title!: string;
  public description!: string;
  public dueDate!: Date;
  public attachments!: any[]; // Will be associated with File model
  public createdBy!: string | IUser;
  public assignees!: string[] | IMember[];
  public status!: 'todo' | 'continue' | 'completed' | 'overdue';
  public hoursSpent!: number;
  public tags!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

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
        attachments: {
          type: DataTypes.ARRAY(DataTypes.UUID),
          allowNull: false,
          defaultValue: [],
          references: {
            model: 'files',
            key: 'id',
          },
        },
        createdBy: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        assignees: {
          type: DataTypes.ARRAY(DataTypes.UUID),
          allowNull: false,
          defaultValue: [],
          references: {
            model: 'users',
            key: 'id',
          },
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