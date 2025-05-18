<template>
  <div class="applications-wrapper">
    <h2 class="header">Заявки</h2>
    <app-button class="btn-create" @click="emit('open-modal-create')">Создать</app-button>
    <div class="filters-wrapper">
      <app-input placeholder="Введите имя" />
      <app-select
        :options="[
          { id: 'empty', displayName: '' },
          { id: 'active', displayName: 'Активен' },
          { id: 'completed', displayName: 'Завершен' },
          { id: 'in_progress', displayName: 'Выполняется' },
          { id: 'rejected', displayName: 'Отменен' },
        ]"
      />
    </div>
    <table class="applications-table">
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
      <tr v-for="(application, index) in applications">
        <td>{{ index + 1 }}</td>
        <td>{{ application.fullName }}</td>
        <td>{{ application.phone }}</td>
        <td>{{ application.amount }} ₽</td>
        <td>
          <Status :status="application.status" />
        </td>
        <td>
          <div class="centered-block">
            <app-button small>Открыть</app-button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import Status from './Status.vue'

const emit = defineEmits(['open-modal-create'])

const applications = [
  {
    fullName: 'Vladilen',
    phone: '+79291012009',
    amount: '4 200,00',
    status: 'completed',
    action: 'Открыть',
  },
  {
    fullName: 'Maxim',
    phone: '+79291012009',
    amount: '2 490,00',
    status: 'active',
    action: 'Открыть',
  },
  {
    fullName: 'Elena',
    phone: '+79219082112',
    amount: '12 231,00',
    status: 'in_progress',
    action: 'Открыть',
  },
  {
    fullName: 'Egor',
    phone: '+79291012009',
    amount: '2 490,00',
    status: 'rejected',
    action: 'Открыть',
  },
  {
    fullName: 'Vladilen',
    phone: '+79291012009',
    amount: '1 231 231,00',
    status: 'active',
    action: 'Открыть',
  },
  {
    fullName: 'Vladilen',
    phone: '+79291012009',
    amount: '123 132,00',
    status: 'in_progress',
    action: 'Открыть',
  },
  {
    fullName: 'Федор',
    phone: '+79291012009',
    amount: '1 234,00',
    status: 'completed',
    action: 'Открыть',
  },
]
</script>

<style scoped>
.applications-wrapper {
  position: relative;
}
.header {
  font-size: 32px;
  cursor: default;
}
.btn-create {
  position: absolute;
  top: 0;
  right: 0;
}
.filters-wrapper {
  display: flex;
  gap: 16px;
  width: 400px;
  margin: 12px 0;
}
.applications-table {
  width: 100%;
  padding: 0 8px;
  th {
    font-weight: bolder;
    cursor: default;
    padding: 8px 4px;
  }
  td {
    font-weight: lighter;
    text-align: center;
    padding: 8px 4px;
  }
}
.centered-block {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
