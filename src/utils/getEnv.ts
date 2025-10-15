import dotenv from 'dotenv';

dotenv.config();


type NeededEnv = {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
};


function getEnv(key: keyof NeededEnv): NeededEnv[keyof NeededEnv] {
  const map: Record<string, string | undefined> = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    // optional env vars can be added here
  };


  const val = map[key];
  if (!val) {
    throw new Error(`Missing env var ${key}`);
  }


  switch (key) {
    case 'PORT':
      return Number(val) as any;
    default:
      return val as any;
  }
}

export default getEnv;