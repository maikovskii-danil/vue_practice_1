<template>
  <Transition name="opacity" mode="out-in">
    <div v-if="computedTable.headers.length" class="w-full flex flex-col">
      <div
        class="flex items-center cursor-default px-4 py-6 bg-violet-200 dark:text-gray-100 dark:bg-gray-900"
      >
        <div v-for="header in computedTable.headers" :key="header.id" :class="header.twStyle">
          {{ header.displayName }}
        </div>
      </div>
      <div
        class="w-full flex flex-col transition-[height] duration-1000 overflow-hidden"
        :style="`height: ${currentHeightDebounced}px`"
      >
        <template v-for="row in computedTable.rows" :key="row.id">
          <div
            class="flex items-center py-5 px-4 odd:bg-white dark:odd:bg-gray-800 even:bg-violet-200 dark:even:bg-gray-900 dark:text-gray-100"
          >
            <div
              v-for="(cell, index) in row.cells"
              :key="computedTable.headers[index]?.id ?? 'unknown'"
              :class="cell.twStyle"
            >
              <slot :row :cell :name="computedTable.headers[index]?.id ?? 'unknown'">
                {{ cell.value }}
              </slot>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-else class="flex items-center justify-center w-full h-[300px]">{{ emptyText }}</div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { refDebounced } from '@vueuse/core'
import { DEBOUNCE_DELAY } from '@/consts'

interface IHeaderCell {
  id: string
  displayName: string
  twStyle: string
}

interface ICell {
  value: string
  twStyle: string
}

interface IRow {
  id: string
  cells: ICell[]
}

interface ITable {
  headers: IHeaderCell[]
  rows: IRow[]
}

interface ITableProps {
  headers: IHeaderCell[]
  rows: Omit<IRow, 'id'>[]
}

const { table, emptyText = 'Ничего нет' } = defineProps<{
  table?: ITableProps | ITable
  emptyText?: string
}>()

const computedTable = computed<ITable>(() => {
  if (table && table.headers?.length && table.rows?.length) {
    return {
      headers: table.headers,
      rows: table.rows.map((item, index) => ({
        ...item,
        id: table.headers[index]?.id ?? '== UNKNOWN HEADER ==',
      })),
    } as ITable
  }

  return {
    headers: [],
    rows: [],
  }
})

const currentHeight = computed(() => {
  const row = 48
  const result = computedTable.value.rows.length * row

  return result > 0 ? result : 0
})

const currentHeightDebounced = refDebounced<number>(currentHeight, DEBOUNCE_DELAY)
</script>
