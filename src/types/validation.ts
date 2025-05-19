import { z } from 'zod'

export const userSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export const statusUnion = z.union([
  z.literal('active'),
  z.literal('completed'),
  z.literal('in_progress'),
  z.literal('rejected'),
])

export const applicationSchema = z.object({
  fullName: z.string().min(1, 'Обязательное поле'),
  phone: z.string().min(1, 'Обязательное поле'),
  amount: z.number().min(1, 'Минимальная сумма равна 1'),
  status: statusUnion,
})
