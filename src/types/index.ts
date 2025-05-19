import { z } from 'zod'
import { userSchema, applicationSchema } from './validation'

export interface IUserData extends z.infer<typeof userSchema> {}

export interface IApplication extends z.infer<typeof applicationSchema> {
  id: string
}
