import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { ITimeSheetEntry } from '../types';

type TimeSheetEntryCreation = Optional<
  ITimeSheetEntry,
  'id' | 'totalTime' | 'createdAt' | 'updatedAt'
>;

class TimeSheetEntry
  extends Model<ITimeSheetEntry, TimeSheetEntryCreation>
  implements ITimeSheetEntry
{
  public id!: string;
  public task!: string;
  public createdBy!: string;
  public startTime!: string;
  public endTime!: string;
  public totalTime!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    TimeSheetEntry.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        task: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'tasks',
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
        startTime: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        totalTime: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
        tableName: 'time_sheet_entries',
      }
    );
  }
}

export default TimeSheetEntry;