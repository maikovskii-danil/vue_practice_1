<script>
export default {
  props: {
    options: {
      type: Array, // [{ id: "default", displayName: "value" }]
      required: true,
    },
  },
};
</script>

<template>
  <select class="select">
    <option
      v-for="option in options"
      class="option"
      :key="option.id"
      :value="option.id"
    >
      {{ option.displayName }}
    </option>
  </select>
</template>

<style scoped>
.select {
  all: unset;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #a6a6a6;
  width: 100%;
  height: 37px;
}
.option {
  all: unset;
  &:focus {
    outline: none;
  }
}
</style>
