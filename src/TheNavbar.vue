<template>
  <header class="header" v-if="visible">
    <h1>Tinkoff</h1>
    <ul class="navbar-menu">
      <li>
        <router-link :to="{ name: 'applications' }">Заявки</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'help' }">Помощь</router-link>
      </li>
      <li>
        <a href="#">Сообщения</a>
      </li>
      <li>
        <a href="#" @click.prevent="userStore.logout">Выйти</a>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import useUserStore from './stores/user'

const userStore = useUserStore()

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
h1 {
  cursor: default;
  font-size: 24px;
}
.header {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  padding: 0 8px;
  h3 {
    margin: 0;
  }
}
.navbar-menu {
  all: unset;
  display: flex;
  gap: 24px;
  margin-right: 32px;
  a {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
