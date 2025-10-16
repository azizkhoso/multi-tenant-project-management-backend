type DeepPartial<T> = { // make all fields including nested object fields in an object optional
  [K in keyof T]?: T[K] extends Record<string, any> ? DeepPartial<T[K]> : T[K];
};

type DeepSelect<T, K extends keyof T> = {
  [P in K]: T[P] extends object ? DeepSelect<T[P], keyof T[P]> : T[P];
};

declare namespace Express {
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

declare type TErrorCode = 'SERVER_ERROR' // generic server error
  | 'BAD_REQUEST' // input data or request parameters is invalid
  | 'NOT_FOUND' // specified resource is not found
  | 'INVALID_API_VERSION' // api version is not supplied or is invalid
  | 'DUPLICATE_RESOURCE' // any unique key constraint is not satisfied
  | 'INVALID_ROLE' // role should be one of seller, buyer or admin
  | 'VALIDATION_FAILED' // any yup validation is failed
  | 'INVALID_TOKEN' // any jwt token is expired or invalid
  | 'INCORRECT_PASSWORD'; // login password is incorrect