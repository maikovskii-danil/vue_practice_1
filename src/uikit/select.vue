<template>
  <div class="w-full relative">
    <button
      ref="select-btn"
      :class="`
      w-full
      flex items-center
      p-4 border
      cursor-pointer rounded
      bg-white dark:bg-gray-900
      border-gray-400 dark:border-gray-900
      focus:outline-violet-500 focus:outline-2 focus:border-violet-500
      `"
    >
      <span v-if="currentDisplayName" class="text-gray-950 dark:text-white">
        {{ currentDisplayName }}
      </span>
      <span v-else class="text-gray-400">Не выбрано</span>
    </button>
    <div
      ref="select-dropdown"
      :class="`
      absolute w-full
      hidden
      px-2 py-1
      cursor-default rounded
      bg-gray-900
      `"
    >
      <template v-for="option in options" :key="option.id">
        <button
          v-if="option.displayName"
          ref="select-options"
          :class="`w-full
          cursor-pointer rounded
          outline-0
          px-4 py-2 my-1
          text-white text-left
          hover:bg-violet-700 
          focus:outline-violet-700 focus:outline-2
          `"
          @click="selectOption(option.id)"
        >
          {{ option.displayName }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { computed, useTemplateRef } from 'vue'

const { options } = defineProps<{
  options: Array<{ id: string; displayName: string }>
}>()
const model = defineModel<string>()

const optionsMap = computed(() => {
  return options.reduce(
    (acc, option) => ({ ...acc, [option.id]: option.displayName }),
    {} as Record<string, string>,
  )
})

const currentDisplayName = computed(() => {
  if (model && model.value) {
    const key = model.value as keyof typeof optionsMap.value
    const value = optionsMap.value[key]

    if (typeof value === 'string' && value) {
      return value
    }
  }

  return
})

const button = useTemplateRef('select-btn')
const dropdown = useTemplateRef('select-dropdown')
const refOptions = useTemplateRef<HTMLButtonElement[]>('select-options')

const selectOption = (optionId: string) => {
  model.value = optionId

  if (!dropdown.value) {
    return
  }

  dropdown.value.classList.toggle('hidden')
}

useEventListener(button, 'click', () => {
  if (!dropdown.value) {
    return
  }

  dropdown.value.classList.toggle('hidden')

  if (refOptions.value) {
    refOptions.value[0]?.focus()
  }
})

useEventListener(document, 'click', (evt) => {
  if (!button.value || !dropdown.value || !evt.target) {
    return
  }

  if (!button.value.contains(evt.target as Node) && !dropdown.value.contains(evt.target as Node)) {
    dropdown.value.classList.add('hidden')
  }
})
</script>
