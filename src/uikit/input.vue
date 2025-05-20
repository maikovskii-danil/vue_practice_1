<template>
  <label class="container">
    <input class="input" :="$attrs" v-model="model" />
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
