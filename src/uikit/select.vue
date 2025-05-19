<template>
  <div class="select-wrapper">
    <select
      class="select"
      :="$attrs"
      :value="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="option in options" class="option" :key="option.id" :value="option.id">
        {{ option.displayName || 'Не выбрано' }}
      </option>
    </select>
    <div class="arrow">
      <img :src="ArrowSvgLink" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowSvgLink from '@/assets/arrow.svg'

interface Props {
  modelValue: string
  options: Array<{ id: string; displayName: string }>
}

const { options, modelValue } = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.select-wrapper {
  position: relative;
  width: 100%;
}
.arrow {
  position: absolute;
  top: 14px;
  right: 4px;
  width: 18px;
  height: 15px;
}
.select {
  all: unset;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #a6a6a6;
  width: 100%;
  height: 37px;
}
.option {
  all: unset;
  &:focus {
    outline: none;
  }
}
</style>
