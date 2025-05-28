<template>
  <form class="flex flex-col gap-2 mt-8" @submit.prevent>
    <div class="dark:text-gray-100">ФИО:</div>
    <app-input
      ref="fullName-input"
      placeholder="Введите ФИО"
      with-error
      :error="formErrors.fullName"
      v-model="formData.fullName"
      @focus="formErrors.fullName = ''"
    />
    <div class="dark:text-gray-100">Телефон:</div>
    <app-input
      placeholder="79876543210"
      filter="phone"
      with-error
      :error="formErrors.phone"
      v-model.num.positive="formData.phone"
      @focus="formErrors.phone = ''"
    />
    <div class="dark:text-gray-100">Сумма:</div>
    <app-input
      placeholder="Сумма"
      with-error
      :error="formErrors.amount"
      v-model.num.positive="formData.amount"
      @focus="formErrors.amount = ''"
    />
    <div class="dark:text-gray-100">Статус:</div>
    <app-select :options="APPLICATION_STATUS_OPTIONS" v-model="formData.status" />
    <div class="mt-16">
      <app-button type="button" @click="submit">Создать</app-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue'
import { useFocus } from '@vueuse/core'
import { APPLICATION_STATUS_OPTIONS } from '@/consts'
import type { IApplication } from '@/types'
import { applicationSchema } from '@/types/validation'
import type { ToString } from '@/utility-types'

useFocus(useTemplateRef<HTMLInputElement>('fullName-input'), { initialValue: true })

const emit = defineEmits<{
  (e: 'submit', formData: Omit<IApplication, 'id'>): void
}>()
const { initialForm } = defineProps<{ initialForm: Omit<IApplication, 'id'> }>()

const formData = reactive<ToString<typeof initialForm>>({
  ...initialForm,
  amount: (initialForm.amount || '').toString(),
})
const formErrors = ref({ fullName: '', phone: '', amount: '' })

const submit = () => {
  const preparedToSubmitFormData = {
    ...formData,
    amount: +formData.amount,
  }

  const { success, error, data } = applicationSchema.safeParse(preparedToSubmitFormData)

  if (success) {
    emit('submit', data)
  } else {
    const foundErrors = { fullName: '', phone: '', amount: '' }

    error.errors.forEach((zodErrorRecord) => {
      const key = zodErrorRecord.path[0] as keyof typeof foundErrors
      foundErrors[key] = zodErrorRecord.message
    })
    formErrors.value = foundErrors
  }
}
</script>
