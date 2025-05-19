<template>
  <label class="container">
    <input
      class="input"
      :="$attrs"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>

<script setup lang="ts">
const { modelValue } = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.container {
  display: block;
  background: #fff;
  padding: 8px 0;
  border: 1px solid #a6a6a6;
  cursor: text;
  width: 100%;
}
.input {
  all: unset;
  box-sizing: border-box;
  width: 100%;
  padding: 0 12px;
}
</style>
