import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
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
  const errors = reactive({
    form: { email: '', password: '' },
    api: '',
  })

  const formValidation = (user: IUserData) => {
    if (!user.email) {
      errors.form.email = 'Обязательное поле'
    } else {
      errors.form.email = ''
    }

    if (!user.password) {
      errors.form.password = 'Обязательное поле'
    } else if (user.password.length < 6) {
      errors.form.password = 'Пароль должен быть не меньше 6 символов'
    } else {
      errors.form.password = ''
    }

    return !(errors.form.email || errors.form.password)
  }

  const apiValidation = (user: IUserData) => {
    const foundUser = REGISTERED_USERS_DATA_MAP[user.email]

    if (!foundUser) {
      errors.api = 'Нет пользователя с таким email'
    } else if (foundUser.password !== user.password) {
      errors.api = 'Неверный пароль'
    } else {
      errors.api = ''
    }

    return !errors.api
  }

  const tryLoginProcess = (user: IUserData) => {
    const isValidForm = formValidation(user)

    if (!isValidForm) {
      return
    }

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
    errors,
    tryLoginProcess,
    login,
    logout,
  }
})

export default useUserStore
