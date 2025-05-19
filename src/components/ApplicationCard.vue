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
          :options="options"
          :modelValue="application.status"
          @update:modelValue="emit('change-application', { ...application, status: $event })"
        />
      </div>
      <div>
        <app-button renderStrategy="danger" @click="emit('remove-application', application.id)">
          Удалить
        </app-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TApplication } from '@/types'
import Status from './Status.vue'

const emit = defineEmits(['change-application', 'remove-application'])
const { application } = defineProps<{ application: TApplication }>()

const options = [
  { id: 'active', displayName: 'Активен' },
  { id: 'completed', displayName: 'Завершен' },
  { id: 'in_progress', displayName: 'Выполняется' },
  { id: 'rejected', displayName: 'Отменен' },
]
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
