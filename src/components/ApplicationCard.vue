<template>
  <div class="bg-white rounded p-6 w-[700px]">
    <h2 class="my-10 text-3xl">Заявка</h2>
    <div class="flex flex-col gap-10">
      <div class="flex gap-4">
        <div>Имя владельца:</div>
        <div>{{ application.fullName }}</div>
      </div>
      <div class="flex gap-4">
        <div>Телефон:</div>
        <div>+{{ application.phone }}</div>
      </div>
      <div class="flex gap-4 items-center">
        <div>Статус:</div>
        <div><Status class="w-38 text-center" :status="application.status" /></div>
      </div>
      <div class="flex gap-4">
        <div>Сумма:</div>
        <div>{{ displayAmount(application.amount) }}</div>
      </div>
      <div>
        <div class="mb-4">Изменить статус:</div>
        <app-select
          :options="APPLICATION_STATUS_OPTIONS"
          :model-value="application.status"
          @update:model-value="$emit('change-application', { ...application, status: $event })"
        />
      </div>
      <div>
        <app-button style-strategy="danger" @click="$emit('remove-application', application.id)">
          Удалить
        </app-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IApplication } from '@/types'
import { APPLICATION_STATUS_OPTIONS } from '@/consts'
import displayAmount from '@/utils/displayAmount'
import Status from './Status.vue'

defineEmits<{
  (e: 'change-application', application: IApplication): void
  (e: 'remove-application', id: string): void
}>()
defineProps<{ application: IApplication }>()
</script>
