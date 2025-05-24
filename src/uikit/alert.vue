<template>
  <Transition name="opacity">
    <div v-if="visible" class="border border-solid border-l-4 bg-white p-8" :class="twCSS">
      <div class="text-3xl" :class="styleStrategy">{{ title }}</div>
      <div ref="before-close-button" class="my-7 text-black pl-3">{{ textCache }}</div>
      <app-button type="button" :style-strategy="styleStrategy" @click="$emit('close')">
        Закрыть
      </app-button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useFocus } from '@vueuse/core'

useFocus(useTemplateRef<HTMLDivElement>('before-close-button'), { initialValue: true })

const {
  styleStrategy = 'primary',
  title = 'Alert Title',
  text = 'Some text description',
  visible = false,
} = defineProps<{
  styleStrategy?: 'primary' | 'danger'
  title?: string
  text?: string
  visible?: boolean
}>()

const textCache = computed((previous) => (text ? text : previous))
const twCSS = computed(() => {
  switch (styleStrategy) {
    case 'danger': {
      return 'text-red-500 border-red-500'
    }
    case 'primary':
    default: {
      return 'text-green-500 border-green-500'
    }
  }
})
</script>
