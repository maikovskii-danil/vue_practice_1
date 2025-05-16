<template>
  <TheNavbar visible />
  <div class="container">
    <div class="card">
      <h2 :id @click="console.log('id', id)">header</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TheNavbar from './TheNavbar.vue'

const id = ref('some_id')
</script>
