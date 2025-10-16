import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { IFile, ICompany } from '../types';

type CompanyCreation = Optional<ICompany, 'id'>;

class Company extends Model<ICompany, CompanyCreation> implements ICompany {
  public id!: string;
  public email!: string;
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
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
