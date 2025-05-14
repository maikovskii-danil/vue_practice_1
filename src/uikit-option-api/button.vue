<script>
export default {
  props: {
    renderStrategy: {
      type: String,
      required: false,
      default: "primary",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: "button",
    },
  },
  data() {
    return {
      emits: ["click"],
    };
  },
};
</script>

<template>
  <button :type="type" :class="`btn ${renderStrategy}`" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  all: unset;
  cursor: pointer;
  min-width: 60px;
  min-height: 30px;

  border-radius: 12px;
  padding: 4px 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;

  background: #fff;

  transition: all 0.7s ease;
  &:disabled {
    background: #fff;
    border-color: #aaa;
    color: #aaa;
    cursor: not-allowed;
  }
}
.primary {
  border: 2px solid #138b4d;
  color: #138b4d;
  text-transform: uppercase;
  &:hover:not(:disabled) {
    color: #fff;
    border-color: #fff;
    background: #138b4d;
  }
}
.secondary {
  border: 2px solid transparent;
  color: #b49900;
  &:hover:not(:disabled) {
    text-decoration: underline;
  }
}
.danger {
  border: 2px solid #ca0f05;
  color: #ca0f05;
  text-transform: uppercase;
  &:hover:not(:disabled) {
    color: #fff;
    border-color: #fff;
    background: #ca0f05;
  }
}
.confirm {
  border: 2px solid #2207f0;
  color: #2207f0;
  text-transform: uppercase;
  &:hover:not(:disabled) {
    color: #fff;
    border-color: #fff;
    background: #2207f0;
  }
}
.inline {
  display: inline-flex;
}
</style>
