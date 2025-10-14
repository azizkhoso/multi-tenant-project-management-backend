import * as yup from 'yup';

// utility schemas
export const emailSchema = yup.string().email();
export const passwordSchema = yup.string().min(8);

// composite schemas
export const loginSchema = yup.object({
  email: emailSchema.required('Email is required'),
  password: passwordSchema.required('Password is required'),
});