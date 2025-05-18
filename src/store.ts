import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { UserData } from './types'

const useUserStore = defineStore('counter', () => {
  const router = useRouter()

  const usersData = reactive<UserData[]>([
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
      {} as Record<string, UserData>,
    )
  })

  const currentUser = reactive({
    email: 'some.user@automation.testing',
    password: '123456',
  })

  const isLoggedIn = ref(true)
  const errors = reactive({
    form: {
      email: '',
      password: '',
    },
    api: '',
  })

  const formValidation = (user: { email: string; password: string }) => {
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

  const apiValidation = (user: { email: string; password: string }) => {
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

  const login = (user: { email: string; password: string }) => {
    isLoggedIn.value = true
    currentUser.email = user.email
    currentUser.password = user.password
  }

  const tryLoginProcess = (user: { email: string; password: string }) => {
    const isValidForm = formValidation(user)

    console.log('isValidForm', isValidForm)

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

  const logout = () => {
    isLoggedIn.value = false
    currentUser.email = ''
    currentUser.password = ''

    router.push({ name: 'auth' })
  }

  return {
    usersData,
    usersMap,
    currentUser,
    isLoggedIn,
    errors,
    tryLoginProcess,
    logout,
  }
})

export default useUserStore
