<template>
  <form class="flex flex-col gap-2 mt-8" @submit.prevent="submit">
    <div>ФИО</div>
    <app-input
      v-model="formData.fullName"
      ref="fullName-input"
      placeholder="Введите ФИО"
      @focus="clearErrorByKey('fullName')"
    />
    <div class="text-red-600 text-xs min-h-7">{{ formErrors.fullName || '&nbsp;' }}</div>
    <div>Телефон</div>
    <app-input
      placeholder="79876543210"
      filter="phone"
      v-model.num="formData.phone"
      @focus="clearErrorByKey('phone')"
    />
    <div class="text-red-600 text-xs min-h-7">{{ formErrors.phone || '&nbsp;' }}</div>
    <div>Сумма</div>
    <app-input
      type="number"
      placeholder="Сумма"
      :model-value="(formData.amount || '').toString()"
      @update:model-value="formData.amount = +$event"
      @focus="clearErrorByKey('amount')"
    />
    <div class="text-red-600 text-xs min-h-7">{{ formErrors.amount || '&nbsp;' }}</div>
    <div>Статус</div>
    <app-select :options="APPLICATION_STATUS_OPTIONS" v-model="formData.status" />
    <div class="mt-8">
      <app-button type="submit">Создать</app-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, shallowRef, useTemplateRef } from 'vue'
import { useFocus } from '@vueuse/core'
import { APPLICATION_STATUS_OPTIONS } from '@/consts'
import type { IApplication } from '@/types'
import { applicationSchema } from '@/types/validation'

useFocus(useTemplateRef<HTMLInputElement>('fullName-input'), { initialValue: true })

const emit = defineEmits<{
  (e: 'submit', formData: Omit<IApplication, 'id'>): void
}>()
const { initialForm } = defineProps<{ initialForm: Omit<IApplication, 'id'> }>()

const formData = reactive<Omit<IApplication, 'id'>>(initialForm)
const formErrors = shallowRef({ fullName: '', phone: '', amount: '' })

const clearErrorByKey = (key: keyof typeof formErrors.value) => {
  formErrors.value = { ...formErrors.value, [key]: '' }
}

const submit = () => {
  formData.phone = formData.phone === '0' ? '' : formData.phone

  const { success, error } = applicationSchema.safeParse(formData)

  if (success) {
    emit('submit', formData)
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
