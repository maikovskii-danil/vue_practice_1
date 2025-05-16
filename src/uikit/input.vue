<script>
export default {
  emits: "update:modelValue",
  props: {
    id: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    renderStrategy: {
      type: String,
      required: false,
      default: "default", // 'default' | 'number'
    },
    changeStrategy: {
      type: String,
      required: false,
      default: "default", // 'default' | 'number'
    },
  },
  data() {
    return {
      prevValue: this.value ?? "",
    };
  },
  methods: {
    handleInput(evt) {
      if (this.changeStrategy === "number") {
        const trimmedTextValue = evt.target.value.trim();

        if (trimmedTextValue) {
          const numValue = parseInt(evt.target.value);

          if (isNaN(numValue)) {
            evt.target.value = this.prevValue;
          } else {
            evt.target.value = numValue.toString();
          }
        }
      }

      this.prevValue = evt.target.value;
      this.$emit("update:modelValue", evt.target.value);
    },
  },
  computed: {
    calculatedType() {
      if (this.renderStrategy === "number") {
        return "number";
      }

      return "text";
    },
  },
};
</script>

<template>
  <label class="container">
    <input
      v-if="typeof modelValue === 'string'"
      class="input"
      :id="id"
      :type="type ?? calculatedType"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput($event)"
    />
    <input
      v-else
      class="input"
      :id="id"
      :type="type ?? calculatedType"
      :name="name"
      :placeholder="placeholder"
      @input="handleInput($event)"
    />
  </label>
</template>

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
