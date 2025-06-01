import { z } from 'zod';
import { userSchema, applicationSchema, statusUnion } from './validation';

export type TApplicationStatus = z.infer<typeof statusUnion>;

export interface IUserData extends z.infer<typeof userSchema> {}

export interface IApplication extends z.infer<typeof applicationSchema> {
  id: string;
}
