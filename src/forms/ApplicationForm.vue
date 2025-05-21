<template>
  <form class="application-form" @submit.prevent="submit">
    <div>ФИО</div>
    <app-input
      placeholder="Введите ФИО"
      v-model="formData.fullName"
      @focus="clearErrorByKey('fullName')"
    />
    <div class="error">{{ formErrors.fullName }}</div>
    <div>Телефон</div>
    <app-input
      placeholder="79876543210"
      filter="phone"
      v-model.num="formData.phone"
      @focus="clearErrorByKey('phone')"
    />
    <div class="error">{{ formErrors.phone }}</div>
    <div>Сумма</div>
    <app-input
      type="number"
      placeholder="Сумма"
      :model-value="(formData.amount || '').toString()"
      @update:model-value="formData.amount = +$event"
      @focus="clearErrorByKey('amount')"
    />
    <div class="error">{{ formErrors.amount }}</div>
    <div>Статус</div>
    <app-select :options="APPLICATION_STATUS_OPTIONS" v-model="formData.status" />
    <div class="btn-create-wrapper">
      <app-button type="submit">Создать</app-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { APPLICATION_STATUS_OPTIONS } from '@/consts'
import type { IApplication } from '@/types'
import { applicationSchema } from '@/types/validation'

const emit = defineEmits(['submit'])
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

<style scoped>
.application-form {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 16px;
}
.error {
  font-size: 12px;
  height: 14px;
  color: #e60c0c;
}
.btn-create-wrapper {
  margin-top: 16px;
}
</style>
