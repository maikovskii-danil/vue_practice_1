<template>
  <div class="full-min-height">
    <TheNavbar :visible="userStore.isLoggedIn" />
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
</style>
