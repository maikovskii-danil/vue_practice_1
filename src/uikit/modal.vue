<template>
  <div class="modal-backdrop" @click="emit('close')"></div>
  <div class="modal"><slot /></div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: 0.4;
}
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}
</style>
