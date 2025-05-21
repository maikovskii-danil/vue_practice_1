<template>
  <Transition>
    <div v-if="visible" class="alert" :class="{ [type]: true }">
      <div class="title" :class="type">{{ title }}</div>
      <div class="text">{{ textCache }}</div>
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
.alert {
  border-left: 4px solid transparent;
  border-right: 1px dashed #151414;
  border-top: 1px dashed #151414;
  border-bottom: 1px dashed #151414;
  padding: 16px;
  background: #fff;
}
.title {
  margin: 0;
  font-size: 30px;
}
.text {
  color: #000;
  padding-left: 5px;
  margin: 14px 0;
}
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
