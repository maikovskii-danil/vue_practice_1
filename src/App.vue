<template>
  <div class="container"></div>
</template>

<script setup lang="ts"></script>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
ul {
  all: unset;
}
li {
  all: unset;
}
a {
  all: unset;
  cursor: pointer;
}
button {
  all: unset;
}
.active {
  text-decoration: underline;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  padding-top: 8px;
}
.card {
  background: #fff;
  width: 600px;
  margin: auto;
  padding: 8px;
  border-radius: 4px;
}
.no-padding {
  padding: 0;
}
</style>
