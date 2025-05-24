<template>
  <label
    :class="`
    border rounded border-gray-400 
    focus-within:outline-violet-500 focus-within:outline-1 focus-within:border-violet-500 
    relative
    flex items-center
    pr-2 w-full
    cursor-pointer
    `"
  >
    <select class="p-4 w-full outline-0" :="$attrs" v-model="model">
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.displayName || 'Не выбрано' }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
const { options } = defineProps<{
  options: Array<{ id: string; displayName: string }>
}>()
const model = defineModel()
</script>
