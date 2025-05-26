<template>
  <form @submit.prevent="submit">
    <div class="flex flex-col gap-4 mb-4">
      <div class="dark:text-gray-100 cursor-default">Email:</div>
      <app-input
        v-model="userForm.email"
        ref="email-input"
        type="email"
        placeholder="Введите email"
        @focus="clearErrorByKey('email')"
      />
      <div class="text-red-600 dark:text-red-500 cursor-default text-xs min-h-7">
        {{ formErrors.email || '&nbsp;' }}
      </div>
    </div>
    <div class="flex flex-col gap-4 mb-4">
      <div class="dark:text-gray-100 cursor-default">Пароль:</div>
      <app-input
        v-model="userForm.password"
        type="password"
        placeholder="Введите пароль"
        autocomplete="on"
        @focus="clearErrorByKey('password')"
      />
      <div class="text-red-600 dark:text-red-500 cursor-default text-xs min-h-7">
        {{ formErrors.password || '&nbsp;' }}
      </div>
    </div>
    <app-button type="submit">Войти</app-button>
  </form>
</template>

<script setup lang="ts">
import { reactive, shallowRef, useTemplateRef } from 'vue'
import { useFocus } from '@vueuse/core'
import type { IUserData } from '@/types'
import { userSchema } from '@/types/validation'

useFocus(useTemplateRef<HTMLInputElement>('email-input'), { initialValue: true })

const emit = defineEmits<{
  (e: 'submit', form: IUserData): void
}>()
const { initialForm } = defineProps<{ initialForm: IUserData }>()

const userForm = reactive<IUserData>(initialForm)
const formErrors = shallowRef({ email: '', password: '' })

const clearErrorByKey = (key: keyof typeof formErrors.value) => {
  formErrors.value = { ...formErrors.value, [key]: '' }
}

const submit = () => {
  const { success, error } = userSchema.safeParse(userForm)

  if (success) {
    emit('submit', userForm)
  } else {
    const foundErrors = { email: '', password: '' }

    error.errors.forEach((zodErrorRecord) => {
      const key = zodErrorRecord.path[0] as keyof typeof foundErrors
      foundErrors[key] = zodErrorRecord.message
    })
    formErrors.value = foundErrors
  }
}
</script>
