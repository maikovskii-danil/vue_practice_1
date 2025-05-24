<template>
  <Transition name="opacity" mode="out-in">
    <div
      :key="disabledTransition ? 'default' : status"
      class="inline-block border-2 rounded-xl p-2 px-3 text-[9px] font-bold cursor-default"
      :class="twStyle"
      :="$attrs"
    >
      {{ statusDisplayName }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { status, disabledTransition = false } = defineProps<{
  status: string
  disabledTransition?: boolean
}>()

const statusDisplayName = computed(() => {
  switch (status) {
    case 'active': {
      return 'Активен'
    }
    case 'completed': {
      return 'Завершен'
    }
    case 'rejected': {
      return 'Отменен'
    }
    case 'in_progress': {
      return 'Выполняется'
    }
    default: {
      return '== Unknown =='
    }
  }
})

const twStyle = computed(() => {
  switch (status) {
    case 'active': {
      return 'border-green-700 text-green-700'
    }
    case 'completed': {
      return 'border-green-700 text-green-700'
    }
    case 'rejected': {
      return 'border-red-500 text-red-500'
    }
    case 'in_progress': {
      return 'border-blue-700 text-blue-700'
    }
    default: {
      return 'border-green-700 text-green-700'
    }
  }
})
</script>
