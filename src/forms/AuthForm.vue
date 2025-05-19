<template>
  <form @submit.prevent="submit">
    <div class="form-control">
      <label for="email">Email</label>
      <app-input v-model="userForm.email" type="email" id="email" placeholder="Введите email" />
      <div class="error">{{ formErrors.email }}</div>
    </div>
    <div class="form-control">
      <label for="password">Пароль</label>
      <app-input
        v-model="userForm.password"
        type="password"
        id="password"
        placeholder="Введите пароль"
        autocomplete="on"
      />
      <div class="error">{{ formErrors.password }}</div>
    </div>
    <app-button type="submit">Войти</app-button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { IUserData } from '@/types'

interface Props {
  initialForm: IUserData
}

const emit = defineEmits(['submit'])
const { initialForm } = defineProps<Props>()

const userForm = reactive<IUserData>(initialForm)
const formErrors = reactive({ email: '', password: '' })

const formValidation = (user: IUserData) => {
  if (!user.email) {
    formErrors.email = 'Обязательное поле'
  } else {
    formErrors.email = ''
  }

  if (!user.password) {
    formErrors.password = 'Обязательное поле'
  } else if (user.password.length < 6) {
    formErrors.password = 'Пароль должен быть не меньше 6 символов'
  } else {
    formErrors.password = ''
  }

  return !(formErrors.email || formErrors.password)
}

const submit = () => {
  const isValid = formValidation(userForm)

  if (isValid) {
    emit('submit', userForm)
  }
}
</script>

<style scoped>
.form-control {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}
.error {
  color: #e81818;
  min-height: 14px;
  font-size: 12px;
}
</style>
