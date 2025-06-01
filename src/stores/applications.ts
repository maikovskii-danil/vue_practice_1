import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type { IApplication } from '@/types';
import { INITIAL_APPLICATIONS, INITIAL_LAST_ID } from '@/consts';

const useApplicationsStore = defineStore('applications', () => {
  const lastId = ref(INITIAL_LAST_ID);
  const applications = reactive<IApplication[]>(INITIAL_APPLICATIONS);

  const create = (newApplication: Omit<IApplication, 'id'>) => {
    lastId.value += 1;
    applications.push({ id: lastId.value + '', ...newApplication });
  };

  const change = (updatedApplication: IApplication) => {
    const index = applications.findIndex((application) => {
      return application.id === updatedApplication.id;
    });

    if (index !== -1) {
      applications.splice(index, 1, updatedApplication);
    }
  };

  const remove = (id: string) => {
    const index = applications.findIndex((application) => {
      return application.id === id;
    });

    if (index !== -1) {
      applications.splice(index, 1);
    }
  };

  return {
    initialApplications: INITIAL_APPLICATIONS,
    initialLastId: INITIAL_LAST_ID,
    applications,
    create,
    change,
    remove,
  };
});

export default useApplicationsStore;
