<template>
  <div class="border-solid border border-gray-400 relative flex items-center pr-2 w-full">
    <select class="p-4 px-6 cursor-pointer w-full outline-0" :="$attrs" v-model="model">
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.displayName || 'Не выбрано' }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const { options } = defineProps<{
  options: Array<{ id: string; displayName: string }>
}>()
const model = defineModel()
</script>
