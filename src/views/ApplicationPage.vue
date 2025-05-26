<template>
  <div class="flex flex-col gap-2 shadow-xl/20">
    <Teleport to="#alerts">
      <app-alert
        v-if="isOpenedAlertSuccess"
        type="primary"
        title="Успешно!"
        text="Заявка обновлена"
        class="fixed width-350"
        @close="isOpenedAlertSuccess = false"
      ></app-alert>
    </Teleport>
    <button
      class="hover:underline cursor-pointer text-left font-bold dark:text-white"
      @click="returnToMain"
    >
      Назад на Главную
    </button>
    <ApplicationCard
      v-if="currentApplication"
      :application="currentApplication"
      @change-application="changeApplication"
      @remove-application="removeApplication"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import ApplicationCard from '@/components/ApplicationCard.vue'
import useApplicationsStore from '@/stores/applications'
import type { IApplication } from '@/types'

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
