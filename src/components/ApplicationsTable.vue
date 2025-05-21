<template>
  <div v-if="applications.length" class="applications-table">
    <div class="headers">
      <div class="id">ID</div>
      <div class="fullname">ФИО</div>
      <div class="phone">Телефон</div>
      <div>Сумма</div>
      <div class="status">Статус</div>
      <div class="action">Действие</div>
    </div>
    <div v-for="application in applications" :key="application.id" class="row">
      <div class="id">{{ application.id }}</div>
      <div class="fullname">{{ application.fullName }}</div>
      <div class="phone">{{ application.phone }}</div>
      <div>{{ application.amount.toFixed(2) }} ₽</div>
      <div class="status">
        <Status :status="application.status" />
      </div>
      <div class="action">
        <app-button small @click="$emit('open-application', application.id)">Открыть</app-button>
      </div>
    </div>
  </div>
  <div v-else class="centered-block height-300">Заявок нет</div>
</template>

<script setup lang="ts">
import type { IApplication } from '@/types'
import Status from './Status.vue'

defineEmits(['open-application'])
const { applications } = defineProps<{ applications: IApplication[] }>()
</script>

<style scoped>
.applications-table {
  width: 100%;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.centered-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.id {
  width: 90px;
  cursor: default;
}
.fullname {
  width: 100px;
}
.phone {
  width: 140px;
}
.status {
  margin-left: auto;
  text-align: center;
  width: 70px;
}
.action {
  margin-left: 16px;
}
.height-300 {
  height: 300px;
}
.headers {
  display: flex;
  align-items: center;
  height: 30px;
  cursor: default;
}
.row {
  display: flex;
  align-items: center;
}
</style>
