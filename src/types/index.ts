import { z } from 'zod';

import { applicationSchema, statusUnion, userSchema } from './validation';

export type TApplicationStatus = z.infer<typeof statusUnion>;

export type TUserData = Required<z.infer<typeof userSchema>>;

export interface IApplication extends z.infer<typeof applicationSchema> {
  id: string;
}
