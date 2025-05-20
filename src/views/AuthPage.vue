<template>
  <div class="card">
    <h1 class="title">Войдите в систему</h1>
    <AuthForm :initial-form="{ email: '', password: '' }" @submit="submit" />
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/user'
import type { IUserData } from '@/types'
import AuthForm from '@/forms/AuthForm.vue'

const userStore = useUserStore()

const submit = (userForm: IUserData) => {
  userStore.tryLoginProcess(userForm)
}
</script>

<style scoped>
.title {
  margin: 32px 0;
}
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
