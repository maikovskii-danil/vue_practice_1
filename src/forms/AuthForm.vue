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
import { userSchema } from '@/types/validation'

const emit = defineEmits(['submit'])
const { initialForm } = defineProps<{ initialForm: IUserData }>()

const userForm = reactive<IUserData>(initialForm)
const formErrors = reactive({ email: '', password: '' })

const submit = () => {
  const { success, error } = userSchema.safeParse(userForm)

  if (success) {
    emit('submit', userForm)
  } else {
    error.errors.forEach((zodErrorRecord) => {
      const key = zodErrorRecord.path[0] as keyof typeof formErrors
      formErrors[key] = zodErrorRecord.message
    })
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
