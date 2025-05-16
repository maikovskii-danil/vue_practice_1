<template>
  <button @click="show = !show">Toggle</button>
  <Transition name="transition">
    <ChildChild v-if="show" />
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChildChild from './ChildChild.vue'

const show = ref(false)
</script>

<style scoped>
.transition-enter-active,
.transition-leave-active {
  transition: opacity 0.5s ease;
}

.transition-enter-from,
.transition-leave-to {
  opacity: 0;
}
</style>
