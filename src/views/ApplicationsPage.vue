<template>
  <div
    class="w-350 rounded-xl p-6 pt-16 bg-white dark:bg-gray-700 shadow-xl/20"
  >
    <Teleport to="#modals">
      <app-modal :visible="isOpenedModal" @close="isOpenedModal = false">
        <div class="w-250 p-6 rounded-xl bg-white dark:bg-gray-700">
          <h3 class="text-2xl pt-8 dark:text-gray-100">Создать заявку</h3>
          <ApplicationForm
            :initial-form="{
              name: '',
              phone: '',
              amount: 0,
              status: 'active',
            }"
            @submit="submit"
          />
        </div>
      </app-modal>
    </Teleport>
    <Teleport to="#alerts">
      <app-alert
        :visible="isSuccessfullyCreated"
        type="primary"
        title="Успешно!"
        text="Заявка создана"
        class="fixed w-175 top-6 right-6"
        @close="isSuccessfullyCreated = false"
      ></app-alert>
    </Teleport>
    <Applications
      :applications="applicationsStore.applications"
      @open-modal-create="isOpenedModal = true"
      @open-application="openApplication"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Applications from '@/components/Applications.vue';
import ApplicationForm from '@/forms/ApplicationForm.vue';
import useApplicationsStore from '@/stores/applications';
import type { IApplication } from '@/types';

const router = useRouter();
const applicationsStore = useApplicationsStore();
const isOpenedModal = ref(false);
const isSuccessfullyCreated = ref(false);

const submit = (evt: Omit<IApplication, 'id'>) => {
  applicationsStore.create(evt);
  isOpenedModal.value = false;
  isSuccessfullyCreated.value = true;
};

const openApplication = (id: string) => {
  router.push({ name: 'application', params: { applicationId: id } });
};
</script>
