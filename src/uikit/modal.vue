<template>
  <Transition>
    <div v-if="visible" class="modal-wrapper">
      <div class="modal-backdrop" @click="emit('close')"></div>
      <div class="modal"><slot /></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()
const { visible } = defineProps<{ visible: boolean }>()
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  z-index: 1;
}
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}
</style>
