<template>
  <Transition>
    <div
      v-if="visible"
      class="border border-solid border-gray-950 border-l-4 border-l-transparent bg-white p-8"
      :class="{ [type]: true }"
    >
      <div class="text-3xl" :class="type">{{ title }}</div>
      <div class="my-7 text-black pl-3">{{ textCache }}</div>
      <app-button type="button" :render-strategy="type" @click="$emit('close')">
        Закрыть
      </app-button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const {
  type = 'primary',
  title = 'Alert Title',
  text = 'Some text description',
  visible = false,
} = defineProps<{
  type?: string
  title?: string
  text?: string
  visible?: boolean
}>()

const textCache = computed((previous) => (text ? text : previous))
</script>

<style scoped>
.primary {
  color: #138b4d;
  border-color: #138b4d;
}
.secondary {
  border-color: #b49900;
  color: #b49900;
}
.danger {
  border-color: #ca0f05;
  color: #ca0f05;
}
</style>
