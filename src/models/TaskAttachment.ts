import { DataTypes, Model, Sequelize } from 'sequelize';

class TaskAttachment extends Model {
  static initialize(sequelize: Sequelize) {
    TaskAttachment.init(
      {
        task: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'tasks', key: 'id' },
        },
        file: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'files', key: 'id' },
        },
      },
      {
        sequelize,
        tableName: 'task_attachments',
        timestamps: false,
      }
    );
  }
}

export default TaskAttachment;