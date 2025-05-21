<template>
  <div>
    <div class="card wrapper">
      <Applications
        :applications="applicationsStore.applications"
        @open-modal-create="isOpenedModal = true"
        @open-application="openApplication"
      />
    </div>
    <Teleport to="body">
      <app-modal :visible="isOpenedModal" @close="isOpenedModal = false">
        <div class="modal-wrapper">
          <h3 class="modal-header">Создать заявку</h3>
          <ApplicationForm
            :initial-form="{
              fullName: '',
              phone: '',
              amount: 0,
              status: 'active',
            }"
            @submit="submit"
          />
        </div>
      </app-modal>
    </Teleport>
    <Teleport to="body">
      <app-alert
        :visible="isSuccessfullyCreated"
        type="primary"
        title="Успешно!"
        text="Заявка создана"
        class="fixed width-350"
        @close="isSuccessfullyCreated = false"
      ></app-alert>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Applications from '@/components/Applications.vue'
import ApplicationForm from '@/forms/ApplicationForm.vue'
import useApplicationsStore from '@/stores/applications'
import type { IApplication } from '@/types'

const router = useRouter()
const applicationsStore = useApplicationsStore()
const isOpenedModal = ref(false)
const isSuccessfullyCreated = ref(false)

const submit = (evt: IApplication) => {
  applicationsStore.create(evt)
  isOpenedModal.value = false
  isSuccessfullyCreated.value = true
}

const openApplication = (id: string) => {
  router.push({ name: 'application', params: { applicationId: id } })
}
</script>

<style scoped>
.wrapper {
  padding: 32px 12px 12px 12px;
}
.modal-wrapper {
  width: 500px;
  padding: 12px;
  border-radius: 8px;
  background: #fff;
}
.modal-header {
  margin-top: 16px;
}
</style>
