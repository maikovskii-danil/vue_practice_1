<template>
  <Transition mode="out-in">
    <div v-if="applications.length" class="applications-table">
      <div class="headers">
        <div class="id">ID</div>
        <div class="fullname">ФИО</div>
        <div class="phone">Телефон</div>
        <div>Сумма</div>
        <div class="status">Статус</div>
        <div class="action">Действие</div>
      </div>
      <div
        class="applications-table height-animation"
        :style="`height: ${currentHeightDebounced}px`"
      >
        <template v-for="application in applications" :key="application.id">
          <div class="row">
            <div class="id">{{ application.id }}</div>
            <div class="fullname">{{ application.fullName }}</div>
            <div class="phone">{{ '+' + application.phone }}</div>
            <div>{{ displayAmount(application.amount) }}</div>
            <div class="status">
              <Status :status="application.status" />
            </div>
            <div class="action">
              <app-button small @click="$emit('open-application', application.id)">
                Открыть
              </app-button>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-else class="centered-block height-300">Заявок нет</div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { refDebounced } from '@vueuse/core'
import { DEBOUNCE_DELAY } from '@/consts'
import type { IApplication } from '@/types'
import displayAmount from '@/utils/displayAmount'
import Status from './Status.vue'

defineEmits<{
  (e: 'open-application', id: string): void
}>()
const { applications } = defineProps<{ applications: IApplication[] }>()

const currentHeight = computed(() => {
  const row = 30
  const gap = 16
  const result = applications.length * (row + gap) - gap

  return result > 0 ? result : 0
})

const currentHeightDebounced = refDebounced<number>(currentHeight, DEBOUNCE_DELAY)
</script>

<style scoped>
.height-animation {
  transition: height 1s ease;
  overflow: hidden;
}
.applications-table {
  width: 100%;
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
  padding: 0 8px;
}
.row {
  display: flex;
  align-items: center;
  padding: 0 8px;
}
</style>
