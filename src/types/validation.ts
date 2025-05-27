import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().min(1, 'Обязательное поле'),
  password: z
    .string()
    .min(6, 'Пароль должен быть не меньше 6 символов')
    .min(1, 'Обязательное поле'),
})

export const statusUnion = z.union([
  z.literal('active'),
  z.literal('completed'),
  z.literal('in_progress'),
  z.literal('rejected'),
])

export const applicationSchema = z.object({
  fullName: z.string().min(1, 'Обязательное поле'),
  phone: z.string().min(11, 'Неправильный номер телефона').min(1, 'Обязательное поле'),
  amount: z.number().min(1, 'Обязательное поле'),
  status: statusUnion,
})
