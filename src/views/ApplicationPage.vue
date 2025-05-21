<template>
  <div class="application-page-wrapper">
    <Teleport to="body">
      <app-alert
        v-if="isOpenedAlertSuccess"
        type="primary"
        title="Успешно!"
        text="Заявка обновлена"
        class="fixed width-350"
        @close="isOpenedAlertSuccess = false"
      ></app-alert>
    </Teleport>
    <button class="link" @click="returnToMain">Назад на Главную</button>
    <ApplicationCard
      v-if="currentApplication"
      :application="currentApplication"
      @change-application="changeApplication"
      @remove-application="removeApplication"
    />
  </div>
</template>

<script setup lang="ts">
import ApplicationCard from '@/components/ApplicationCard.vue'
import useApplicationsStore from '@/stores/applications'
import type { IApplication } from '@/types'
import { computed, ref, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'

const { applicationId } = defineProps<{ applicationId: string }>()

const router = useRouter()
const applicationsStore = useApplicationsStore()
const isOpenedAlertSuccess = ref(false)

const { change, remove } = applicationsStore

const currentApplication: ComputedRef<IApplication | undefined> = computed((previous) => {
  const foundApplicaton = applicationsStore.applications.find(
    (application) => application.id === applicationId,
  )

  return foundApplicaton ?? previous
})

const changeApplication = (updated: IApplication) => {
  isOpenedAlertSuccess.value = true
  change(updated)
}

const removeApplication = (id: string) => {
  remove(id)
  router.push({ name: 'applications' })
}

const returnToMain = () => {
  router.push({ name: 'applications' })
}
</script>

<style scoped>
.application-page-wrapper {
  margin: 8px auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.link {
  color: #fff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
