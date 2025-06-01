<template>
  <div class="relative">
    <h2 class="text-3xl dark:text-gray-100 cursor-default">Заявки</h2>
    <app-button
      class="absolute top-0 right-0"
      @click="$emit('open-modal-create')"
    >
      Создать
    </app-button>
    <div class="flex gap-8 w-225 my-6">
      <app-input placeholder="Введите имя" v-model="name" />
      <app-select v-model="status" :options="statusOptions" />
      <Transition name="opacity" mode="out-in">
        <div v-if="name || status !== 'empty'" class="flex items-center">
          <app-button @click="clear">Очистить</app-button>
        </div>
        <div v-else class="min-w-[96.5px] h-[37px]"></div>
      </Transition>
    </div>
    <ApplicationsTable
      :applications="filteredApplications"
      @open-application="$emit('open-application', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IApplication } from '@/types';
import { APPLICATION_STATUS_OPTIONS, DEBOUNCE_DELAY } from '@/consts';
import { refDebounced } from '@vueuse/core';
import ApplicationsTable from './ApplicationsTable.vue';

defineEmits<{
  (e: 'open-modal-create'): void;
  (e: 'open-application', id: string): void;
}>();
const { applications } = defineProps<{ applications: IApplication[] }>();

const defaultOptionId = 'empty';
const statusOptions = [
  { id: defaultOptionId, displayName: '' },
  ...APPLICATION_STATUS_OPTIONS,
];

const status = ref(defaultOptionId);

const name = ref('');
const nameDebounced = refDebounced<string>(name, DEBOUNCE_DELAY);

const filteredApplications = computed(() => {
  return applications
    .filter((application) => application.name.includes(nameDebounced.value))
    .filter(
      (application) =>
        status.value === defaultOptionId || application.status === status.value,
    );
});

const clear = () => {
  name.value = '';
  status.value = defaultOptionId;
};
</script>
