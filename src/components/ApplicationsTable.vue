<template>
  <Transition name="opacity" mode="out-in">
    <div v-if="applications.length" class="w-full flex flex-col gap-8">
      <div class="flex items-center h-16 cursor-default px-4">
        <div class="w-48 cursor-default">ID</div>
        <div class="w-48">ФИО</div>
        <div class="w-64">Телефон</div>
        <div>Сумма</div>
        <div class="w-36 text-center ml-auto">Статус</div>
        <div class="ml-8">Действие</div>
      </div>
      <div
        class="w-full flex flex-col gap-8 transition-[height] duration-1000 overflow-hidden"
        :style="`height: ${currentHeightDebounced}px`"
      >
        <template v-for="application in applications" :key="application.id">
          <div class="flex items-center px-4">
            <div class="w-48 cursor-default">{{ application.id }}</div>
            <div class="w-48">{{ application.fullName }}</div>
            <div class="w-64">{{ '+' + application.phone }}</div>
            <div>{{ displayAmount(application.amount) }}</div>
            <div class="w-36 text-center ml-auto">
              <Status class="w-full" :status="application.status" />
            </div>
            <div class="ml-8">
              <app-button small @click="$emit('open-application', application.id)">
                Открыть
              </app-button>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-else class="flex items-center justify-center w-full h-[300px]">Заявок нет</div>
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
