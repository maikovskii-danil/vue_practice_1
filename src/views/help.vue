<template>
  <div
    class="p-6 pb-12 w-350 bg-white dark:bg-gray-700 rounded-xl shadow-xl/20"
  >
    <h2 class="cursor-default my-12 text-3xl dark:text-gray-100">Помощь</h2>
    <button
      class="block mt-16 cursor-pointer hover:underline dark:text-gray-100"
      @click="isOpenedQuestion1 = !isOpenedQuestion1"
    >
      Что есть в данной системе?
    </button>
    <Transition name="opacity">
      <div
        v-if="isOpenedQuestion1"
        class="mt-4 dark:text-gray-100"
      >
        Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял
      </div>
    </Transition>
    <button
      class="block mt-16 cursor-pointer hover:underline dark:text-gray-100"
      @click="isOpenedQuestion2 = !isOpenedQuestion2"
    >
      Как тут работает авторизация?
    </button>
    <Transition name="opacity">
      <div
        v-if="isOpenedQuestion2"
        class="mt-4 dark:text-gray-100"
      >
        Через localStorage с использованием Zod
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpenedQuestion1 = ref(false);
const isOpenedQuestion2 = ref(false);
</script>
