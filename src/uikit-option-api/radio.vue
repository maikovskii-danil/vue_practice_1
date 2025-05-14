<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
    },
    renderStrategy: {
      type: String,
      required: false,
      default: "radio",
    },
    checked: {
      type: Boolean,
      required: false,
      default: null,
    },
  },
};
</script>

<template>
  <label class="container">
    <input
      v-if="typeof checked === 'boolean'"
      type="radio"
      :name="name"
      :class="renderStrategy"
      :checked="checked"
    />
    <input v-else type="radio" :name="name" :class="renderStrategy" />
    <div><slot /></div>
  </label>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.radio {
  all: unset;
  box-sizing: border-box;
  border: 1px solid #909ca9;
  border-radius: 8px;
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
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: #fff;
  }
}
</style>
