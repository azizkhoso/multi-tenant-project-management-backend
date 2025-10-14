import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { IFile, IUser } from '../types';

type UserCreation = Optional<IUser, 'id' | 'createdAt' | 'updatedAt'>;

class User extends Model<IUser, UserCreation> implements IUser {
  public id!: string;
  public role!: 'company_admin' | 'member';
  public email!: string;
  public password!: string;
  public fullName!: string;
  public avatar?: IFile;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        role: {
          type: DataTypes.ENUM('company_admin', 'member'),
          allowNull: false,
          defaultValue: 'member',
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        avatar: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'files',
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
        tableName: 'users',
      }
    );
  }
}

export default User;