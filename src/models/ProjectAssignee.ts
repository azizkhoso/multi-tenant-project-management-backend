import { DataTypes, Model, Sequelize } from 'sequelize';

class ProjectAssignee extends Model {
  static initialize(sequelize: Sequelize) {
    ProjectAssignee.init(
      {
        project: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'projects', key: 'id' },
        },
        user: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'users', key: 'id' },
        },
      },
      {
        sequelize,
        tableName: 'project_assignees',
        timestamps: false,
      }
    );
  }
}

export default ProjectAssignee;
