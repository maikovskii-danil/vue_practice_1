<template>
  <div class="full-min-height">
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
      <router-view #="{ Component: Page }">
        <Transition mode="out-in">
          <Component :is="Page" />
        </Transition>
      </router-view>
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
.fixed {
  position: fixed;
  top: 16px;
  right: 16px;
}
.width-350 {
  width: 350px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
