import { userSchema } from '@/types/validation'
import type { TUserData } from '@/types'

class LocalStorage {
  USER_KEY = 'user'

  getUser(): TUserData {
    const storedUser = localStorage.getItem(this.USER_KEY)

    try {
      const parsed = userSchema.safeParse(JSON.parse(storedUser ?? '{}'))

      if (parsed.success) {
        return parsed.data
      }
    } catch {}

    return { email: '', password: '' }
  }
  setUser(user: TUserData) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }
}

export default new LocalStorage()
