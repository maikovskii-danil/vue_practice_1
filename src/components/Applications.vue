<template>
  <div class="relative">
    <h2 class="text-3xl cursor-default">Заявки</h2>
    <app-button class="absolute top-0 right-0" @click="$emit('open-modal-create')">
      Создать
    </app-button>
    <div class="flex gap-8 w-225 my-6">
      <app-input placeholder="Введите имя" v-model="fullname" />
      <app-select
        v-model="status"
        :options="[{ id: 'empty', displayName: '' }, ...APPLICATION_STATUS_OPTIONS]"
      />
      <Transition name="opacity" mode="out-in">
        <div v-if="fullname || status !== 'empty'" style="display: flex; align-items: center">
          <app-button small render-strategy="danger" @click="clear">Очистить</app-button>
        </div>
        <div v-else style="min-width: 79px; height: 37px"></div>
      </Transition>
    </div>
    <ApplicationsTable
      :applications="filteredApplications"
      @open-application="$emit('open-application', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IApplication } from '@/types'
import { APPLICATION_STATUS_OPTIONS, DEBOUNCE_DELAY } from '@/consts'
import { refDebounced } from '@vueuse/core'
import ApplicationsTable from './ApplicationsTable.vue'

defineEmits<{
  (e: 'open-modal-create'): void
  (e: 'open-application', id: string): void
}>()
const { applications } = defineProps<{ applications: IApplication[] }>()
const fullname = ref('')
const status = ref('empty')
const fullnameDebounced = refDebounced<string>(fullname, DEBOUNCE_DELAY)

const filteredApplications = computed(() => {
  return applications
    .filter((application) => application.fullName.includes(fullnameDebounced.value))
    .filter((application) => status.value === 'empty' || application.status === status.value)
})

const clear = () => {
  fullname.value = ''
  status.value = 'empty'
}
</script>
