<template>
  <div class="applications-wrapper">
    <h2 class="header">Заявки</h2>
    <app-button class="btn-create" @click="$emit('open-modal-create')">Создать</app-button>
    <div class="filters-wrapper">
      <app-input placeholder="Введите имя" v-model="filters.fullname" />
      <app-select
        v-model="filters.status"
        :options="[{ id: 'empty', displayName: '' }, ...APPLICATION_STATUS_OPTIONS]"
      />
      <div
        v-if="filters.fullname || filters.status !== 'empty'"
        style="display: flex; align-items: center"
      >
        <app-button small render-strategy="danger" @click="clear">Очистить</app-button>
      </div>
      <div v-else style="min-width: 79px; height: 37px"></div>
    </div>
    <div v-if="filteredApplications.length" class="applications-table">
      <div class="headers">
        <div class="id">ID</div>
        <div class="fullname">ФИО</div>
        <div class="phone">Телефон</div>
        <div>Сумма</div>
        <div class="status">Статус</div>
        <div class="action">Действие</div>
      </div>
      <div v-for="application in filteredApplications" :key="application.id" class="row">
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
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { IApplication } from '@/types'
import { APPLICATION_STATUS_OPTIONS } from '@/consts'
import Status from './Status.vue'

defineEmits(['open-modal-create', 'open-application'])
const { applications } = defineProps<{ applications: IApplication[] }>()
const filters = reactive({ fullname: '', status: 'empty' })

const filteredApplications = computed(() => {
  return applications
    .filter((application) => application.fullName.includes(filters.fullname))
    .filter((application) => filters.status === 'empty' || application.status === filters.status)
})

const clear = () => {
  filters.fullname = ''
  filters.status = 'empty'
}
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
  width: 450px;
  margin: 12px 0;
}
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
