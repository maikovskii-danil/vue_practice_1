import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { TApplication } from '@/types'

const useApplicationsStore = defineStore('applications', () => {
  const applications = reactive<TApplication[]>([
    {
      id: '1',
      fullName: 'Vladilen',
      phone: '+79291012009',
      amount: 4200,
      status: 'completed',
    },
    {
      id: '2',
      fullName: 'Maxim',
      phone: '+79291012009',
      amount: 2490,
      status: 'active',
    },
    {
      id: '3',
      fullName: 'Elena',
      phone: '+79219082112',
      amount: 12231,
      status: 'in_progress',
    },
    {
      id: '4',
      fullName: 'Egor',
      phone: '+79291012009',
      amount: 2490,
      status: 'rejected',
    },
    {
      id: '5',
      fullName: 'Vladilen',
      phone: '+79291012009',
      amount: 1231231,
      status: 'active',
    },
    {
      id: '6',
      fullName: 'Vladilen',
      phone: '+79291012009',
      amount: 123132,
      status: 'in_progress',
    },
    {
      id: '7',
      fullName: 'Федор',
      phone: '+79291012009',
      amount: 1234,
      status: 'completed',
    },
  ])

  const change = (updatedApplication: TApplication) => {
    const index = applications.findIndex((application) => {
      return application.id === updatedApplication.id
    })

    if (index !== -1) {
      applications.splice(index, 1, updatedApplication)
    }
  }

  const remove = (id: string) => {
    const index = applications.findIndex((application) => {
      return application.id === id
    })

    if (index !== -1) {
      applications.splice(index, 1)
    }
  }

  return { applications, change, remove }
})

export default useApplicationsStore
