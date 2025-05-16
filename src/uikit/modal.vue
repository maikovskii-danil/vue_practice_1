<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal">Модалка</div>
</template>

<script>
export default {
  emits: ["close"],
};
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
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 300px;
  background: #fff;
  margin: auto;
}
</style>
