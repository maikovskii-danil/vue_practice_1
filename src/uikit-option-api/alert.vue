<template>
  <div class="alert" :class="type">
    <div class="title" :class="type">{{ title }}</div>
    <div class="text">{{ text }}</div>
    <app-button type="button" :renderStrategy="type" @click="$emit('close')">
      Закрыть
    </app-button>
  </div>
</template>

<script>
export default {
  emits: ["close"],
  props: {
    type: {
      type: String,
      required: false,
      default: "primary",
    },
    title: {
      type: String,
      required: false,
      default: "Alert Title",
    },
    text: {
      type: String,
      required: false,
      default: "Some text description",
    },
  },
};
</script>

<style scoped>
.alert {
  border-left: 4px solid transparent;
  padding: 16px;
  background: #fff;
}
.title {
  margin: 0;
  font-size: 30px;
}
.text {
  color: #000;
  padding-left: 5px;
  margin: 14px 0;
}
.primary {
  color: #138b4d;
  border-color: #138b4d;
}
.secondary {
  border-color: #b49900;
  color: #b49900;
}
.danger {
  border-color: #ca0f05;
  color: #ca0f05;
}
</style>
