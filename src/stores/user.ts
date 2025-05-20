import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { IUserData } from '@/types'
import { REGISTERED_USERS_DATA, REGISTERED_USERS_DATA_MAP } from '@/consts'
import { useStorage } from '@vueuse/core'

const useUserStore = defineStore('user', () => {
  const router = useRouter()

  const currentUser = useStorage('user-storage', { email: '', password: '' })

  const isLoggedIn = computed(() => {
    return !!(currentUser.value.email && currentUser.value.password)
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
    currentUser.value.email = user.email
    currentUser.value.password = user.password
  }

  const logout = () => {
    currentUser.value.email = ''
    currentUser.value.password = ''

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
