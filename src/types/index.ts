import { z } from 'zod'
import { userSchema } from './validation'

export type TUserData = z.infer<typeof userSchema>

export type TApplication = {
  id: string
  fullName: string
  phone: string
  amount: number
  status: string
}
