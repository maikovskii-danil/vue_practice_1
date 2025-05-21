import type { IApplication, IUserData } from './types'

export const APPLICATION_STATUS_OPTIONS = [
  { id: 'active', displayName: 'Активен' },
  { id: 'completed', displayName: 'Завершен' },
  { id: 'in_progress', displayName: 'Выполняется' },
  { id: 'rejected', displayName: 'Отменен' },
]

export const INITIAL_APPLICATIONS: IApplication[] = [
  {
    id: '1',
    fullName: 'Vladilen',
    phone: '+79291012009',
    amount: 4200,
    status: 'completed',
  },
  {
    id: '2',
    fullName: 'Maxim',
    phone: '+79291012009',
    amount: 2490,
    status: 'active',
  },
  {
    id: '3',
    fullName: 'Elena',
    phone: '+79219082112',
    amount: 12231,
    status: 'in_progress',
  },
  {
    id: '4',
    fullName: 'Egor',
    phone: '+79291012009',
    amount: 2490,
    status: 'rejected',
  },
  {
    id: '5',
    fullName: 'Vladilen',
    phone: '+79291012009',
    amount: 1231231,
    status: 'active',
  },
  {
    id: '6',
    fullName: 'Vladilen',
    phone: '+79291012009',
    amount: 123132,
    status: 'in_progress',
  },
  {
    id: '7',
    fullName: 'Федор',
    phone: '+79291012009',
    amount: 1234,
    status: 'completed',
  },
]

export const INITIAL_LAST_ID = +(INITIAL_APPLICATIONS.at(-1)?.id ?? 0)

export const REGISTERED_USERS_DATA: IUserData[] = [
  {
    email: 'some.user@automation.testing',
    password: '123456',
  },
]

export const REGISTERED_USERS_DATA_MAP = REGISTERED_USERS_DATA.reduce(
  (acc, user) => {
    return { ...acc, [user.email]: user }
  },
  {} as Record<string, IUserData>,
)

export const DEBOUNCE_DELAY = 300
