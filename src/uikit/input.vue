<template>
  <label
    :class="`
    bg-white
    border rounded border-gray-400
    focus-within:outline-violet-500 focus-within:outline-1 focus-within:border-violet-500
    w-full
    cursor-text
    `"
  >
    <input class="w-full p-4 outline-0" :="$attrs" v-model="model" />
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
