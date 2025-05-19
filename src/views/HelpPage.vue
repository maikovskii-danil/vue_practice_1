<template>
  <div class="wrapper card">
    <h2 class="header">Помощь</h2>
    <button class="question" @click="isOpenedQuestion1 = !isOpenedQuestion1">
      Что есть в данной системе?
    </button>
    <div class="answer" v-if="isOpenedQuestion1">
      Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял
    </div>
    <button class="question" @click="isOpenedQuestion2 = !isOpenedQuestion2">
      Как тут работает авторизация?
    </button>
    <div class="answer" v-if="isOpenedQuestion2">Через localStorage с использованием Zod</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpenedQuestion1 = ref(false)
const isOpenedQuestion2 = ref(false)
</script>

<style scoped>
.wrapper {
  padding: 24px 16px;
}
.header {
  font-size: 32px;
  cursor: default;
}
.question {
  display: block;
  margin-top: 32px;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.answer {
  margin-top: 8px;
}
</style>
