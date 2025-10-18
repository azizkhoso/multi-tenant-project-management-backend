import { ValidationError } from 'yup';

const isNullOrUndefined = (val: any): val is null | undefined => (
  typeof val === 'undefined' || val === null
);

interface ConstructorArgs {
  code: string;
  data?: Record<string, any>
}

interface BadRequest extends ConstructorArgs {
  code: 'BAD_REQUEST'
}
interface ServerError extends ConstructorArgs {
  code: 'SERVER_ERROR'
}
interface ValidationFailed extends ConstructorArgs {
  code: 'VALIDATION_FAILED';
  data: ValidationError
}
interface InvalidApiVersion extends ConstructorArgs {
  code: 'INVALID_API_VERSION';
  data: {
    apiVersions: string[]
  }
}

interface InvalidRole extends ConstructorArgs {
  code: 'INVALID_ROLE';
  data: {
    roles: string[]
  }
}

interface NotFound extends ConstructorArgs {
  code: 'NOT_FOUND';
  data: {
    resource: string;
    [key: string]: any
  }
}

interface DuplicateResource extends ConstructorArgs {
  code: 'DUPLICATE_RESOURCE';
  data: {
    resource: string;
    [key: string]: any
  }
}

interface InvalidToken extends ConstructorArgs {
  code: 'INVALID_TOKEN';
  data: {
    field: 'expired' | 'signature' | 'payload'
  }
}

interface IncorrectPassword extends ConstructorArgs {
  code: 'INCORRECT_PASSWORD'
}
interface Unauthorized extends ConstructorArgs {
  code: 'UNAUTHORIZED',
  data?: {
    requiredRole: string;
  }
}
interface IncorrectOldPassword extends ConstructorArgs {
  code: 'INCORRECT_OLD_PASSWORD'
}
interface IncorrectOtp extends ConstructorArgs {
  code: 'INCORRECT_OTP'
}
interface OtpExpired extends ConstructorArgs {
  code: 'OTP_EXPIRED'
}
interface EmailNotVerified extends ConstructorArgs {
  code: 'EMAIL_NOT_VERIFIED'
}
interface NoPaymentMethod extends ConstructorArgs {
  code: 'NO_PAYMENT_METHOD'
}
interface InvalidPaymentMethod extends ConstructorArgs {
  code: 'INVALID_PAYMENT_METHOD';
  data: {
    field: 'stripeCardData' | 'serviceCustomerId'
  }
}
interface InactivePaymentMethod extends ConstructorArgs {
  code: 'INACTIVE_PAYMENT_METHOD'
}
interface StripeError extends ConstructorArgs {
  code: 'STRIPE_ERROR';
  data: Record<string, any>
}

interface StoreAlreadyCreated extends ConstructorArgs {
  code: 'STORE_ALREADY_CREATED'
}

interface StoreNotCreated extends ConstructorArgs {
  code: 'STORE_NOT_CREATED'
}

interface EmailCanNotBeChanged extends ConstructorArgs {
  code: 'EMAIL_CAN_NOT_BE_CHANGED'
}

interface GoogleLoginFailed extends ConstructorArgs {
  code: 'GOOGLE_LOGIN_FAILED'
}

type Args = InvalidApiVersion
  | ValidationFailed
  | BadRequest
  | InvalidRole
  | NotFound
  | DuplicateResource
  | InvalidToken
  | IncorrectPassword
  | Unauthorized
  | IncorrectOtp
  | OtpExpired
  | EmailNotVerified
  | IncorrectOldPassword
  | NoPaymentMethod
  | InvalidPaymentMethod
  | InactivePaymentMethod
  | StripeError
  | StoreAlreadyCreated
  | StoreNotCreated
  | EmailCanNotBeChanged
  | GoogleLoginFailed
  | ServerError;

// Helper: Map code to its data type
type ArgsDataMap = {
  [K in Args as K['code']]: K extends { data: infer D } ? D : undefined
};

// Type-safe map signature
type ExceptionMap = {
  [K in keyof ArgsDataMap]: (data: ArgsDataMap[K]) => { message: string; status: number }
};

// this map is created so that typescript enforces type detection
// which leads to implementing all error codes without missing any
const map: ExceptionMap = {
  BAD_REQUEST: (data: BadRequest['data']) => ({
    message: 'The request is invalid, please check your inputs',
    status: 400,
  }),
  DUPLICATE_RESOURCE: (data: DuplicateResource['data']) => ({
    message: `${data.resource} already exists${!isNullOrUndefined(data.field) ? ` with provided ${data.field}` : ''}`,
    status: 400
  }),
  VALIDATION_FAILED: (data: ValidationFailed['data']) => ({
    message: `Data validation failed, ${data.message}`,
    status: 400
  }),
  INVALID_TOKEN: (data: InvalidToken['data']) => ({
    message: data.field === 'expired'
      ? 'The provided token is expired'
      : data.field === 'payload' ? 'The provided token is invalid' : 'The provided token is malformed',
    status: 400
  }),
  INVALID_ROLE: (data: InvalidRole['data']) => ({
    message: `Invalid role supplied in the request, possible values are ${data.roles.join(', ')}`,
    status: 400
  }),
  INCORRECT_OLD_PASSWORD: () => ({
    message: 'Incorrect old password',
    status: 400
  }),
  INACTIVE_PAYMENT_METHOD: () => ({
    message: 'Payment method is not active, the request can not be processed',
    status: 400
  }),
  INVALID_PAYMENT_METHOD: () => ({
    message: 'Payment method is not valid',
    status: 400
  }),
  NO_PAYMENT_METHOD: () => ({
    message: 'Payment method is not setup',
    status: 400
  }),
  INCORRECT_OTP: () => ({
    message: 'OTP is incorrect',
    status: 400
  }),
  OTP_EXPIRED: () => ({
    message: 'OTP has expired',
    status: 400
  }),
  STORE_ALREADY_CREATED: () => ({
    message: 'Store is already created',
    status: 400
  }),
  STORE_NOT_CREATED: () => ({
    message: 'Store is not created',
    status: 400
  }),
  EMAIL_CAN_NOT_BE_CHANGED: () => ({
    message: 'Email can not be changed due to multiple authentications added',
    status: 400
  }),
  INVALID_API_VERSION: (data: InvalidApiVersion['data']) => ({
    message: `API version is not supported, possible values are ${data.apiVersions.join(', ')}`,
    status: 400
  }),
  INCORRECT_PASSWORD: () => ({
    message: 'Password is not correct',
    status: 401
  }),
  UNAUTHORIZED: (data: Unauthorized['data']) => ({
    message: data?.requiredRole ? `Login as ${data.requiredRole} to continue` : 'Log in to continue',
    status: 401
  }),
  EMAIL_NOT_VERIFIED: () => ({
    message: 'Email is not verified',
    status: 401
  }),
  NOT_FOUND: (data: NotFound['data']) => ({
    message: isNullOrUndefined(data.field)
      ? `${data.resource} is not found`
      : `${data.resource} with specified ${data.field} is not found`,
    status: 404
  }),
  STRIPE_ERROR: () => ({
    message: 'An error occurred while processing the payment',
    status: 500
  }),
  GOOGLE_LOGIN_FAILED: () => ({
    message: 'An error occured while verifying Google credentials',
    status: 400
  }),
  SERVER_ERROR: () => ({
    message: 'A server error has occurred while processing your request',
    status: 500
  })
};


export const parseError = (e: any): {
  errorCode: string;
  errorData: Record<string, any> | undefined | null;
  errorMessage: string | undefined | null;
  status: number
} => {
  if (e instanceof Exception) {
    return ({
      errorCode: e.code,
      errorData: e.data,
      errorMessage: e.message,
      // @ts-ignore
      status: map[e.code](e.data).status
    });
  } else if (e instanceof ValidationError) {
    return ({
      errorCode: 'VALIDATION_FAILED',
      errorData: e,
      errorMessage: e.message,
      status: map.VALIDATION_FAILED(e).status
    });
  } else {
    console.log(typeof e === 'object' ? JSON.stringify(e) : e, e.stack);
    return ({
      errorCode: 'SERVER_ERROR',
      errorData: e,
      errorMessage: e.message,
      status: 500
    });
  }
};

export default class Exception extends Error {
  public code: Args['code'];
  public status: number;
  public data?: Record<string, any>;

  constructor(args: Args) {
    // @ts-ignore
    const mapped = map[args.code](args.data);
    // generate appropriate message
    super(mapped.message);
    this.code = args.code;
    this.status = mapped.status;
    this.data = args.data;
  }
}