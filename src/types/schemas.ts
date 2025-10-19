import * as yup from 'yup';

// utility schemas
export const emailSchema = () => yup.string().email();
export const passwordSchema = () => yup.string().min(8);

export const fullNameSchema = () => yup.string().min(3).max(100);
export const phoneSchema = () => yup.string().min(10).max(12);
export const addressSchema = () => yup.string().min(10).max(200);

export const titleSchema = () => yup.string().min(3).max(100);
export const categorySchema = () => yup.string().min(3).max(50);
export const descriptionSchema = () => yup.string().min(10).max(1000);
export const idSchema = () => yup.string().uuid();

// composite schemas
export const loginSchema = yup.object({
  email: emailSchema().required('Email is required'),
  password: passwordSchema().required('Password is required'),
});

// user schemas
export const createUserSchema = yup.object({
  email: emailSchema().required('Email is required'),
  password: passwordSchema().required('Password is required'),
  fullName: fullNameSchema().required('Full name is required'),
  company: idSchema().uuid('Company must be a valid UUID').required('Company is required'),
});

export const createUserWithoutCompanySchema = yup.object({
  email: emailSchema().required('Email is required'),
  password: passwordSchema().required('Password is required'),
  fullName: fullNameSchema().required('Full name is required'),
});

// company schemas
export const registerCompanySchema = yup.object({
  fullName: fullNameSchema().required('Full name is required'),
  email: emailSchema().required('Email is required'),
  phone: phoneSchema().required('Phone is required'),
  address: addressSchema().required('Address is required'),
});

export const updateCompanySchema = yup.object({
  fullName: fullNameSchema().optional(),
  email: emailSchema().optional(),
  phone: phoneSchema().optional(),
  address: addressSchema().optional(),
});

// new project schema
export const newProjectSchema = yup.object({
  title: titleSchema().required('Title is required'),
  category: categorySchema().required('Category is required'),
  description: descriptionSchema().required('Description is required'),
  dueDate: yup.date().required('Due date is required'),
  assignees: yup.array().of(idSchema()).optional(),
  // image: idSchema().uuid('Image must be a valid UUID').required('Image is required'),
  // createdBy: idSchema().uuid('CreatedBy must be a valid UUID').required('CreatedBy is required'),
});

// update project schema
export const updateProjectSchema = yup.object({
  title: titleSchema(),
  category: categorySchema(),
  description: descriptionSchema(),
  dueDate: yup.date(),
  status: yup.mixed().oneOf(['todo', 'continue', 'completed', 'overdue']),
  assignees: yup.array().of(idSchema().uuid('Each assignee must be a valid UUID')),
  attachments: yup.array().of(idSchema().uuid('Each attachment must be a valid UUID')),
  image: idSchema().uuid('Image must be a valid UUID'),
});


// new project schema
export const newTaskSchema = yup.object({
  project: idSchema().required('Project is required'),
  title: titleSchema().required('Title is required'),
  description: descriptionSchema().required('Description is required'),
  dueDate: yup.date().required('Due date is required'),
  assignees: yup.array().of(idSchema()).optional().default([]),
  tags: yup.array().of(yup.string()).optional().default([]),
});

export const updateTaskSchema = yup.object({
  title: titleSchema(),
  description: descriptionSchema(),
  dueDate: yup.date(),
  status: yup.string().oneOf(['todo', 'continue', 'completed', 'overdue']),
  assignees: yup.array().of(idSchema()).optional().default([]),
  tags: yup.array().of(yup.string()).optional().default([]),
});