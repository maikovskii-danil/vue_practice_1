<template>
  <label
    :class="`
    w-full
    cursor-text rounded
    border
    bg-white dark:bg-gray-900
    border-gray-400 dark:border-gray-900
    focus-within:outline-violet-500 focus-within:outline-2 focus-within:border-violet-500
    `"
  >
    <input
      class="w-full p-4 outline-0 dark:text-gray-100 placeholder:text-gray-400"
      :="$attrs"
      v-model="model"
    />
  </label>
</template>

<script setup lang="ts">
const [model, modifiers] = defineModel({
  set(value: string) {
    if (modifiers.num) {
      const newValue =
        Array.from(value)
          .filter((letter) => !isNaN(+letter))
          .join('') || '0'

      return newValue
    }

    return value
  },
})
</script>
