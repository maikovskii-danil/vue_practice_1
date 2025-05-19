import { defineStore } from 'pinia'
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { IUserData } from '@/types'
import { REGISTERED_USERS_DATA, REGISTERED_USERS_DATA_MAP } from '@/consts'
import localStorage from './localStorage'

const useUserStore = defineStore('user', () => {
  const router = useRouter()

  const currentUser = reactive<IUserData>(localStorage.getUser())

  const isLoggedIn = computed(() => {
    return !!(currentUser.email && currentUser.password)
  })
  const error = ref('')

  const apiValidation = (user: IUserData) => {
    const foundUser = REGISTERED_USERS_DATA_MAP[user.email]

    if (!foundUser) {
      error.value = 'Нет пользователя с таким email'
    } else if (foundUser.password !== user.password) {
      error.value = 'Неверный пароль'
    } else {
      error.value = ''
    }

    return !error.value
  }

  const tryLoginProcess = (user: IUserData) => {
    const isValidApi = apiValidation(user)

    if (!isValidApi) {
      return
    }

    login(user)
    router.push({ name: 'applications' })
  }

  const login = (user: IUserData) => {
    currentUser.email = user.email
    currentUser.password = user.password
    localStorage.setUser(currentUser)
  }

  const logout = () => {
    currentUser.email = ''
    currentUser.password = ''
    localStorage.setUser(currentUser)

    router.push({ name: 'auth' })
  }

  return {
    usersData: REGISTERED_USERS_DATA,
    usersMap: REGISTERED_USERS_DATA_MAP,
    currentUser,
    isLoggedIn,
    error,
    tryLoginProcess,
    login,
    logout,
  }
})

export default useUserStore
