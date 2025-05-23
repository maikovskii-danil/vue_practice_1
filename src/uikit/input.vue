<template>
  <label class="block bg-white p-4 cursor-text w-full border border-solid border-gray-400">
    <input class="w-full outline-0" :="$attrs" v-model="model" />
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
