import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { IActivity, IProject, ITask, IUser } from '../types';

type ActivityCreation = Optional<
  IActivity,
  'id' | 'createdAt' | 'fildsUpdated' | 'previousValues'
>;

class ActivityModel
  extends Model<IActivity, ActivityCreation>
  implements IActivity
{
  public id!: string;
  public type!: 'created' | 'updated' | 'deleted';
  public fildsUpdated?: string[];
  public previousValues?: (string | boolean | number | undefined)[];
  public createdBy!: string | IUser; // store user id (IUser)
  public resource!: string | ITask | IProject; // store task or project id
  public resourceType!: 'task' | 'project';
  public createdAt!: Date;

  static initialize(sequelize: Sequelize) {
    ActivityModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        type: {
          type: DataTypes.ENUM('created', 'updated', 'deleted'),
          allowNull: false,
        },
        fildsUpdated: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        previousValues: {
          type: DataTypes.ARRAY(DataTypes.JSONB),
          allowNull: true,
        },
        createdBy: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        resource: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        resourceType: {
          type: DataTypes.ENUM('task', 'project'),
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'activities',
        updatedAt: false, // IActivity does not have updatedAt
      }
    );
  }
}

export default ActivityModel;
