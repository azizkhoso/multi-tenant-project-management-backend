import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { IFile } from '../types';

type FileCreation = Optional<IFile, 'id' | 'url'>;

class File extends Model<IFile, FileCreation> implements IFile {
  public id!: string;
  public name!: string;
  public url!: string;
  public size!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    File.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        size: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'files',
      }
    );
  }
}

export default File;

