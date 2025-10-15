import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { IComment, IUser } from '../types';

type CommentCreation = Optional<
  IComment,
  'id' | 'task' | 'createdAt' | 'updatedAt'
>;

class Comment
  extends Model<IComment, CommentCreation>
  implements IComment
{
  public id!: string;
  public createdBy!: string | IUser;
  public message!: string;
  public project!: string;
  public task!: string | undefined;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    Comment.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        createdBy: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        project: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'projects',
            key: 'id',
          },
        },
        task: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'tasks',
            key: 'id',
          },
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
        tableName: 'comments',
      }
    );
  }
}

export default Comment;