<template>
  <label class="container">
    <input
      type="checkbox"
      :name="name"
      :checked="modelValue"
      @change="emit('update:modelValue', !modelValue)"
    />
    <div><slot /></div>
  </label>
</template>

<script setup lang="ts">
interface Props {
  name: string
  modelValue: boolean
}

const { name = '', modelValue = false } = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.checkbox {
  all: unset;
  box-sizing: border-box;
  border: 1px solid #909ca9;
  border-radius: 4px;
  width: 16px;
  height: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease;

  &:checked {
    background: #0363c9;
    border: 1px solid #0363c9;
  }
  &::before {
    content: '';
    display: block;
    width: 9px;
    height: 9px;
    border-radius: 2px;
    background: #fff;
  }
}
</style>
