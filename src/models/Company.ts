import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { IFile, ICompany } from '../types';

type CompanyCreation = Optional<ICompany, 'id'>;

class Company extends Model<ICompany, CompanyCreation> implements ICompany {
  public id!: string;
  public fullName!: string;
  public address!: string;
  public phone!: string;
  public isVerified!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    Company.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: 'companies',
      }
    );
  }
}

export default Company;
