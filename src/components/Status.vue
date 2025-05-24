<template>
  <Transition name="opacity" mode="out-in">
    <div
      :key="disabledTransition ? 'default' : status"
      class="inline-block border border-solid border-black rounded-xl p-2 px-3 text-[9px] cursor-default"
      :class="status"
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
    case 'active':
      return 'Активен'
    case 'completed':
      return 'Завершен'
    case 'rejected':
      return 'Отменен'
    case 'in_progress':
      return 'Выполняется'
    default:
      return '== Unknown =='
  }
})
</script>

<style scoped>
.active {
  border-color: #02a85d;
  color: #02a85d;
}

.completed {
  border-color: #02a85d;
  color: #02a85d;
}

.rejected {
  border-color: #d11a1a;
  color: #d11a1a;
}

.in_progress {
  border-color: #1a29d1;
  color: #1a29d1;
}
</style>
