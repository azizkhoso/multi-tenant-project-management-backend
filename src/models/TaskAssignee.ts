import { DataTypes, Model, Sequelize } from 'sequelize';

class TaskAssignee extends Model {
  static initialize(sequelize: Sequelize) {
    TaskAssignee.init(
      {
        task: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'tasks', key: 'id' },
        },
        user: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'users', key: 'id' },
        },
      },
      {
        sequelize,
        tableName: 'task_assignees',
        timestamps: false,
      }
    );
  }
}

export default TaskAssignee;
