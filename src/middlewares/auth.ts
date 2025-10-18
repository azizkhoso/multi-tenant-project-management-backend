import { type NextFunction, type Request, type Response } from 'express';

import Exception, { parseError } from '../utils/Exception';
import { parseToken } from '../utils/tokenHelpers';

const isStringAndNotEmpty = (value: any): value is string => (
  typeof value === 'string' && value.length !== 0
);

const authMiddleware = (...roles: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const cookie = req.cookies?.['token'];
    const header = req.get('Authorization');
    let tokenData;
    if (isStringAndNotEmpty(cookie)) {
      tokenData = parseToken(cookie);
    } else if (isStringAndNotEmpty(header) && isStringAndNotEmpty(header.split(' ')[1])) {
      tokenData = parseToken(header.split(' ')[1]);
    } else throw new Exception({ code: 'UNAUTHORIZED' });
    if (tokenData.type !== 'login') throw new Exception({ code: 'UNAUTHORIZED' });
    // in case no role is provided
    if (roles.length === 0 && !roles.includes(tokenData.data.role)) throw new Exception({ code: 'UNAUTHORIZED', data: { requiredRole: roles.join() } });
    req.user = tokenData.data;
    next();
  } catch (e: any) {
    const errData = parseError(e);
    if (e instanceof Exception && ['INVALID_TOKEN'].includes(e.code)) {
      res.status(401).json({
        error: {
          ...errData,
          errorCode: 'UNAUTHORIZED',
          status: 401
        }
      });
    } else res.status(errData.status).json({ error: errData });
  }
};

export default authMiddleware;