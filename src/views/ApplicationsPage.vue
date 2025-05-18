<template>
  <div class="card wrapper">
    <ApplicationsCard @open-modal-create="isOpenedModal = true" />
  </div>
  <Teleport to="body">
    <app-modal v-if="isOpenedModal" @close="isOpenedModal = false">
      <div class="modal-wrapper">Модалка</div>
    </app-modal>
  </Teleport>
</template>

<script setup lang="ts">
import ApplicationsCard from '@/components/ApplicationsCard.vue'
import { ref } from 'vue'

const isOpenedModal = ref(false)
</script>

<style scoped>
.wrapper {
  padding: 32px 12px 12px 12px;
}
.modal-wrapper {
  padding: 12px;
}
</style>
