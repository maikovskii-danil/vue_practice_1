<template>
  <header class="header" v-if="visible">
    <h3>Project</h3>
    <ul class="navbar-menu">
      <li>
        <a href="#">About</a>
      </li>
      <li>
        <a href="#">Myself</a>
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style scoped>
h3 {
  cursor: default;
}
.header {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  padding: 0 8px;
  h3 {
    margin: 0;
  }
}
.navbar-menu {
  all: unset;
  display: flex;
  gap: 8px;
  a {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
