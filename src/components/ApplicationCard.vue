<template>
  <div class="bg-white dark:bg-gray-700 rounded p-6 w-[700px]">
    <h2 class="my-10 text-3xl dark:text-gray-100">Заявка</h2>
    <div class="flex flex-col gap-10">
      <div class="flex gap-4">
        <div class="dark:text-gray-100">Имя владельца:</div>
        <div class="dark:text-gray-100">{{ application.name }}</div>
      </div>
      <div class="flex gap-4">
        <div class="dark:text-gray-100">Телефон:</div>
        <div class="dark:text-gray-100">+{{ application.phone }}</div>
      </div>
      <div class="flex gap-4 items-center">
        <div class="dark:text-gray-100">Статус:</div>
        <div><Status class="w-40 text-center" :status="application.status" /></div>
      </div>
      <div class="flex gap-4">
        <div class="dark:text-gray-100">Сумма:</div>
        <div class="dark:text-gray-100">{{ displayAmount(application.amount) }}</div>
      </div>
      <div>
        <div class="mb-4 dark:text-gray-100">Изменить статус:</div>
        <app-select :options="APPLICATION_STATUS_OPTIONS" v-model="applicationStatus" />
      </div>
      <div class="flex gap-4">
        <app-button style-strategy="danger" @click="$emit('remove-application', application.id)">
          Удалить
        </app-button>
        <app-button
          style-strategy="primary"
          :disabled="applicationStatus === application.status"
          @click="changeApplication"
        >
          Обновить
        </app-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IApplication } from '@/types'
import { APPLICATION_STATUS_OPTIONS } from '@/consts'
import displayAmount from '@/utils/displayAmount'
import { statusUnion } from '@/types/validation'
import Status from './Status.vue'

const emit = defineEmits<{
  (e: 'change-application', application: IApplication): void
  (e: 'remove-application', id: string): void
}>()
const { application } = defineProps<{ application: IApplication }>()

const applicationStatus = ref(application.status)

const changeApplication = () => {
  const statusParseData = statusUnion.safeParse(applicationStatus.value)

  if (statusParseData.success) {
    emit('change-application', {
      ...application,
      status: statusParseData.data,
    })
  }
}
</script>
