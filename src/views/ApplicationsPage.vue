<template>
  <div class="card wrapper">
    <Applications
      :applications="applicationsStore.applications"
      @open-modal-create="isOpenedModal = true"
      @open-application="openApplication"
    />
  </div>
  <Teleport to="body">
    <app-modal v-if="isOpenedModal" @close="isOpenedModal = false">
      <div class="modal-wrapper">Модалка</div>
    </app-modal>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Applications from '@/components/Applications.vue'
import useApplicationsStore from '@/stores/applications'

const router = useRouter()
const applicationsStore = useApplicationsStore()
const isOpenedModal = ref(false)

const openApplication = (id: string) => {
  router.push({ name: 'application', params: { applicationId: id } })
}
</script>

<style scoped>
.wrapper {
  padding: 32px 12px 12px 12px;
}
.modal-wrapper {
  padding: 12px;
}
</style>
