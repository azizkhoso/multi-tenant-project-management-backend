import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    rawBody?: Buffer;
    apiVersion?: 'v1';
    user?: {
      // authId: string; // auth id of AuthAccount
      id: string;
      isEmailNotVerified?: boolean;
      role: 'member' | 'company_admin' | 'superadmin';
    }
  }
}