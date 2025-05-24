<template>
  <div class="mt-24 p-4 w-350 bg-white rounded-xl">
    <h1 class="cursor-default my-16 text-2xl">Войдите в систему</h1>
    <AuthForm :initial-form="{ email: '', password: '' }" @submit="submit" />
    <Teleport to="body">
      <app-alert
        :visible="!!userStore.error"
        style-strategy="danger"
        title="Ошибка!"
        :text="userStore.error"
        class="fixed top-8 right-8 w-175"
        @click="userStore.error = ''"
      ></app-alert>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/user'
import AuthForm from '@/forms/AuthForm.vue'
import type { IUserData } from '@/types'

const userStore = useUserStore()

const submit = (userForm: IUserData) => {
  userStore.tryLoginProcess(userForm)
}
</script>
