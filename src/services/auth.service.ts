import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import getEnv from '../utils/getEnv';
import Exception from '../utils/Exception';
import { IUser } from '../types';

const JWT_SECRET = getEnv('JWT_SECRET') as string;
const JWT_EXPIRES_IN = getEnv('JWT_EXPIRES_IN') as number;
const SALT_ROUNDS = 8;

export async function register(data: { email: string; password: string; fullName: string; role: IUser['role'] }) {
  const exists = await User.findOne({ where: { email: data.email } });
  if (exists) throw new Exception({ code: 'DUPLICATE_RESOURCE', data: { resource: data.role.toUpperCase() } });

  const hashed = await bcrypt.hash(data.password, SALT_ROUNDS);
  const user = await User.create({ email: data.email, password: hashed, fullName: data.fullName, role: data.role ?? 'member' });
  return user;
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Exception({ code: 'NOT_FOUND', data: { resource: 'USER' } });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Exception({ code: 'INCORRECT_PASSWORD' });

  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { token, user };
}
