<template>
  <form class="application-form" @submit.prevent="submit">
    <div>ФИО</div>
    <app-input
      placeholder="Введите ФИО"
      v-model="formData.fullName"
      @focus="errors.fullName = ''"
    />
    <div class="error">{{ errors.fullName }}</div>
    <div>Телефон</div>
    <app-input
      placeholder="Телефон"
      :modelValue="formData.phone"
      @focus="errors.phone = ''"
      @update:modelValue="formData.phone = $event"
    />
    <div class="error">{{ errors.phone }}</div>
    <div>Сумма</div>
    <app-input
      type="number"
      placeholder="Сумма"
      :modelValue="(formData.amount || '').toString()"
      @focus="errors.amount = ''"
      @update:modelValue="formData.amount = +$event"
    />
    <div class="error">{{ errors.amount }}</div>
    <div>Статус</div>
    <app-select :options="APPLICATION_STATUS_OPTIONS" v-model="formData.status" />
    <div class="btn-create-wrapper">
      <app-button type="submit">Создать</app-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { APPLICATION_STATUS_OPTIONS } from '@/consts'
import type { IApplication } from '@/types'
import { applicationSchema } from '@/types/validation'
import type { ZodError } from 'zod'

const emit = defineEmits(['submit'])
const errors = reactive({ fullName: '', phone: '', amount: '' })
const { initialForm } = defineProps<{ initialForm: Omit<IApplication, 'id'> }>()

const formData = reactive<Omit<IApplication, 'id'>>(initialForm)

const submit = () => {
  try {
    applicationSchema.parse(formData)
    emit('submit', formData)
  } catch (err) {
    ;(err as ZodError).errors.forEach((zodErrorRecord) => {
      errors[zodErrorRecord.path[0] as keyof typeof errors] = zodErrorRecord.message
    })
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
