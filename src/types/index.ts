export type PartialPick<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

export type UserRole = 'company_admin' | 'member';

export interface IResource {
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser extends IResource {
  id: string;
  role: UserRole;
  email: string;
  password: string;
  avatar?: IFile;
  fullName: string;
}

export interface ICompany {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  isVerified: boolean; // should become true when super admin verifies the company
}

export interface ICompanyAdmin extends IUser {
  company: string | ICompany;
  role: 'company_admin';
}

export interface IMember extends IUser {
  company: string | ICompany;
  role: 'member';
}

export interface IFile {
  id: string;
  name: string;
  url: string;
  size: number;
}

export type ProjectStatus = 'todo' | 'continue' | 'completed' | 'overdue';

export interface IProject extends IResource {
  id: string;
  title: string;
  category: string;
  description: string;
  dueDate: Date;
  image: IFile;
  attachments: IFile[];
  createdBy: ICompanyAdmin | string;
  assignees: IMember[] | string[];
  status: ProjectStatus;
}

export interface ITask extends IResource {
  id: string;
  project: IProject | string;
  title: string;
  description: string;
  dueDate: Date;
  attachments: IFile[];
  createdBy: IUser;
  assignees: IMember[] | string[];
  status: 'todo' | 'continue' | 'completed' | 'overdue';
  hoursSpent: number;
  tags: string[];
}

export interface ITimeSheetEntry extends IResource {
  id: string;
  task: ITask | string;
  createdBy: IMember | string;
  startTime: string;
  endTime: string;
  totalTime: number; // in minutes
}

export interface IComment extends IResource {
  id: string;
  createdBy: IMember | ICompanyAdmin;
  message: string;
  project: IProject | string;
  task: ITask | string | undefined;
}

export type Activity = ({
  id: string;
  createdBy: IUser;
  resource: ITask | IProject;
  resourceType: 'task' | 'project';
  createdAt: Date;
}) & ({
  type: 'created'
} | {
  type: 'updated',
  fieldsUpdated: string[];
  previousValues: (string | boolean | number | undefined)[];
} | {
  type: 'deleted'
})