<template>
  <div class="card">
    <h2 class="header">Заявка</h2>
    <div class="table">
      <div class="row">
        <div>Имя владельца:</div>
        <div>{{ application.fullName }}</div>
      </div>
      <div class="row">
        <div>Телефон:</div>
        <div>{{ application.phone }}</div>
      </div>
      <div class="row">
        <div>Статус:</div>
        <div><Status :status="application.status" /></div>
      </div>
      <div class="row">
        <div>Сумма:</div>
        <div>{{ application.amount.toFixed(2) }} ₽</div>
      </div>
      <div>
        <div class="change-status-label">Изменить статус:</div>
        <app-select
          :options="APPLICATION_STATUS_OPTIONS"
          :model-value="application.status"
          @update:model-value="$emit('change-application', { ...application, status: $event })"
        />
      </div>
      <div>
        <app-button render-strategy="danger" @click="$emit('remove-application', application.id)">
          Удалить
        </app-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IApplication } from '@/types'
import { APPLICATION_STATUS_OPTIONS } from '@/consts'
import Status from './Status.vue'

defineEmits(['change-application', 'remove-application'])
defineProps<{ application: IApplication }>()
</script>

<style scoped>
.header {
  margin-top: 24px;
  margin-bottom: 24px;
  font-size: 32px;
}
.row {
  display: flex;
  gap: 8px;
}
.table {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.change-status-label {
  margin-bottom: 8px;
}
</style>
