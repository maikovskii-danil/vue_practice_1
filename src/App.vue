<template>
  <div class="full-min-height" :class="{ centered: !userStore.isLoggedIn }">
    <TheNavbar :visible="userStore.isLoggedIn" />
    <Teleport to="body">
      <app-alert
        v-if="userStore.error"
        type="danger"
        title="Ошибка!"
        :text="userStore.error"
        class="fixed width-350"
        @click="userStore.error = ''"
      ></app-alert>
    </Teleport>
    <div class="container" :class="{ uncentered: userStore.isLoggedIn }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheNavbar from './TheNavbar.vue'
import useUserStore from './stores/user'

const userStore = useUserStore()
</script>

<style>
.full-min-height {
  min-height: 100vh;
}
.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}
.uncentered {
  padding-top: 8px;
}
.fixed {
  position: fixed;
  top: 16px;
  right: 16px;
}
.width-350 {
  width: 350px;
}
</style>
