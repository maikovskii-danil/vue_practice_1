<template>
  <div class="card margin-top-64">
    <h1 class="title">Войдите в систему</h1>
    <AuthForm :initial-form="{ email: '', password: '' }" @submit="submit" />
    <Teleport to="body">
      <app-alert
        :visible="!!userStore.error"
        type="danger"
        title="Ошибка!"
        :text="userStore.error"
        class="fixed width-350"
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

<style scoped>
.margin-top-64 {
  margin-top: 64px;
}
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
