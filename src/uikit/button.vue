<template>
  <button
    :class="`
    ${twCSS}
    p-4 px-8 rounded-2xl
    text-sm
    focus:outline-2 focus:outline-offset-2
    cursor-pointer
    `"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { styleStrategy = 'primary' } = defineProps<{
  styleStrategy?: 'primary' | 'confirm' | 'danger'
}>()

const twCSS = computed(() => {
  switch (styleStrategy) {
    case 'danger': {
      return `
        bg-red-500 hover:bg-red-600 active:bg-red-700
        text-white
        focus:outline-red-500
      `
    }
    case 'confirm': {
      return `
        bg-green-500 hover:bg-green-600 active:bg-green-700
        text-white
        focus:outline-green-500
      `
    }
    case 'primary':
    default: {
      return `
        bg-violet-500 hover:bg-violet-600 active:bg-violet-700
        text-white
        focus:outline-violet-500
      `
    }
  }
})
</script>
