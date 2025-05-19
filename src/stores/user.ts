import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { TUserData } from '@/types'
import localStorage from './localStorage'

const useUserStore = defineStore('user', () => {
  const router = useRouter()

  const usersData = reactive<TUserData[]>([
    {
      email: 'some.user@automation.testing',
      password: '123456',
    },
  ])

  const usersMap = computed(() => {
    return usersData.reduce(
      (acc, user) => {
        return { ...acc, [user.email]: user }
      },
      {} as Record<string, TUserData>,
    )
  })

  const currentUser = reactive<TUserData>(localStorage.getUser())

  const isLoggedIn = ref(!!(currentUser.email && currentUser.password))
  const errors = reactive({
    form: { email: '', password: '' },
    api: '',
  })

  const formValidation = (user: TUserData) => {
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

  const apiValidation = (user: TUserData) => {
    const foundUser = usersMap.value[user.email]

    if (!foundUser) {
      errors.api = 'Нет пользователя с таким email'
    } else if (foundUser.password !== user.password) {
      errors.api = 'Неверный пароль'
    } else {
      errors.api = ''
    }

    return !errors.api
  }

  const tryLoginProcess = (user: TUserData) => {
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

  const login = (user: TUserData) => {
    isLoggedIn.value = true
    currentUser.email = user.email
    currentUser.password = user.password
    localStorage.setUser(currentUser)
  }

  const logout = () => {
    isLoggedIn.value = false
    currentUser.email = ''
    currentUser.password = ''
    localStorage.setUser(currentUser)

    router.push({ name: 'auth' })
  }

  return {
    usersData,
    usersMap,
    currentUser,
    isLoggedIn,
    errors,
    tryLoginProcess,
    login,
    logout,
  }
})

export default useUserStore
