import { Sequelize } from 'sequelize';
import getEnv from '../utils/getEnv';

const databaseUrl = getEnv('DATABASE_URL') as string;

export const sequelize = new Sequelize(databaseUrl, {
  logging: false,
  dialect: 'postgres',
});