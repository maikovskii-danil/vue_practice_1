<template>
  <div class="p-4 pb-12 w-350 bg-white rounded-xl">
    <h2 class="cursor-default my-16 text-2xl">Помощь</h2>
    <button
      class="block mt-16 cursor-pointer hover:underline"
      @click="isOpenedQuestion1 = !isOpenedQuestion1"
    >
      Что есть в данной системе?
    </button>
    <Transition name="opacity">
      <div class="mt-4" v-if="isOpenedQuestion1">
        Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял
      </div>
    </Transition>
    <button
      class="block mt-16 cursor-pointer hover:underline"
      @click="isOpenedQuestion2 = !isOpenedQuestion2"
    >
      Как тут работает авторизация?
    </button>
    <Transition name="opacity">
      <div class="mt-4" v-if="isOpenedQuestion2">Через localStorage с использованием Zod</div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpenedQuestion1 = ref(false)
const isOpenedQuestion2 = ref(false)
</script>
