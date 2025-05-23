<template>
  <Transition name="opacity" mode="out-in">
    <header v-if="visible" class="flex items-center justify-between bg-white h-24 px-4 mb-8">
      <h1 class="cursor-default text-2xl">Tinkoff</h1>
      <ul class="flex gap-12 mr-16">
        <li>
          <router-link class="cursor-pointer hover:underline" :to="{ name: 'applications' }">
            Заявки
          </router-link>
        </li>
        <li>
          <router-link class="cursor-pointer hover:underline" :to="{ name: 'help' }">
            Помощь
          </router-link>
        </li>
        <li>
          <a href="#" class="cursor-pointer hover:underline" @click.prevent="userStore.logout">
            Выйти
          </a>
        </li>
      </ul>
    </header>
    <div v-else class="h-24"></div>
  </Transition>
</template>

<script setup lang="ts">
import useUserStore from './stores/user'

defineProps<{ visible: boolean }>()
const userStore = useUserStore()
</script>
