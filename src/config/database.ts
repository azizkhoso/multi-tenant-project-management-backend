import { Sequelize } from 'sequelize';
import getEnv from '../utils/getEnv';

const databaseUrl = getEnv('DATABASE_URL') as string;

const sequelize = new Sequelize(databaseUrl, {
  logging: false,
  dialect: 'postgres',
});

export function connectToDatabase() {
  return sequelize.authenticate();
}

export default sequelize;
