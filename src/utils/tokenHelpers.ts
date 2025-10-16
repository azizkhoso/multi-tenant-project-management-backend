import jwt, { JsonWebTokenError, NotBeforeError, type SignOptions, TokenExpiredError, type VerifyOptions } from 'jsonwebtoken';
import Exception from '../utils/Exception';
import getEnv from './getEnv';

const parseJwtErrorToException = (e: JsonWebTokenError): Exception => {
  const code = 'INVALID_TOKEN';
  let field: 'payload' | 'expired' | 'signature' = 'payload';
  if (e instanceof TokenExpiredError) field = 'expired';
  else if (e instanceof NotBeforeError || e.message === 'invalid signature') field = 'signature';
  return new Exception({
    code,
    data: {
      field
    }
  });
};
interface ITokenData {
  type: string;
  data: Record<string, any>
}
interface EmailVerificationData extends ITokenData {
  type: 'email-verification';
  data: {
    email: string;
    verificationCode: string;
    role: 'member' | 'company_admin' | 'superadmin'
  }
}
interface LoginData extends ITokenData {
  type: 'login';
  data: {
    authId: string; // auth account id
    id: string; // seller or buyer id
    role: 'member' | 'company_admin' | 'superadmin'
    isEmailVerified: boolean
  }
}
interface ResetPasswordData extends ITokenData {
  type: 'reset-password';
  data: {
    id: string;
    email: string;
    role: 'member' | 'company_admin' | 'superadmin'
  }
}
interface UpdateEmailData extends ITokenData {
  type: 'update-email';
  data: {
    id: string; // auth account id
    email: string
  }
}
type TokenDataType = EmailVerificationData | LoginData | ResetPasswordData | UpdateEmailData;

export const generateToken = (props: TokenDataType, options?: SignOptions): string => {
  try {
    const token = jwt.sign(props, getEnv('JWT_SECRET') as string, options);
    return token;
  } catch (e: any) {
    if (e instanceof JsonWebTokenError) throw parseJwtErrorToException(e);
    else throw e;
  }
};
export const parseToken = (token: string, options?: VerifyOptions): TokenDataType => {
  try {
    const data = jwt.verify(token, getEnv('JWT_SECRET') as string, options);
    return data as TokenDataType;
  } catch (e: any) {
    if (e instanceof JsonWebTokenError) throw parseJwtErrorToException(e);
    else throw e;
  }
};