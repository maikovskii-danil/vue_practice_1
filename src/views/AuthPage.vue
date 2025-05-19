<template>
  <div class="card">
    <h1 class="title">Войдите в систему</h1>
    <form @submit.prevent="submit">
      <div class="form-control">
        <label for="email">Email</label>
        <app-input v-model="userForm.email" type="email" id="email" placeholder="Введите email" />
        <div class="error">{{ userStore.errors.form.email }}</div>
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
        <div class="error">{{ userStore.errors.form.password }}</div>
      </div>
      <app-button type="submit">Войти</app-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useUserStore from '@/stores/user'

const userStore = useUserStore()
const userForm = reactive({ email: '', password: '' })

const submit = () => {
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
