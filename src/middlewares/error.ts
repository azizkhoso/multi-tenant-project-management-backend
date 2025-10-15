
// express error middleware
import { Request, Response, NextFunction } from 'express';
import { logError } from '../utils/logger';
import { parseError } from '../utils/Exception';

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const parsed = parseError(err);
  logError(parsed.errorCode + ': ' + parsed.errorMessage, { error: parsed });
  res.status(parsed.status).json({ error: parsed });
}