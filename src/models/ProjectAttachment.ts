import { DataTypes, Model, Sequelize } from 'sequelize';

class ProjectAttachment extends Model {
  static initialize(sequelize: Sequelize) {
    ProjectAttachment.init(
      {
        project: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'projects', key: 'id' },
        },
        file: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'files', key: 'id' },
        },
      },
      {
        sequelize,
        tableName: 'project_attachments',
        timestamps: false,
      }
    );
  }
}

export default ProjectAttachment;