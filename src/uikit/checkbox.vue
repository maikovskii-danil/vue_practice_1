<script>
export default {
  emits: "update:modelValue",
  props: {
    name: {
      type: String,
      required: false,
    },
    renderStrategy: {
      type: String,
      required: false,
      default: "checkbox",
    },
    modelValue: {
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
      v-if="typeof modelValue === 'boolean'"
      type="checkbox"
      :name="name"
      :class="renderStrategy"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <input v-else type="checkbox" :name="name" :class="renderStrategy" />
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
    content: "";
    display: block;
    width: 9px;
    height: 9px;
    border-radius: 2px;
    background: #fff;
  }
}
</style>
