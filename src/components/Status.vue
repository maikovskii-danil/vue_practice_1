<template>
  <div class="status" :class="status">{{ statusDisplayName }}</div>
</template>

<script>
export default {
  props: ['status'],
  computed: {
    statusDisplayName() {
      switch (this.status) {
        case 'active':
          return 'Активен'
        case 'completed':
          return 'Завершен'
        case 'rejected':
          return 'Отклонен'
        case 'in_progress':
          return 'Выполняется'
        default:
          return '== Unknown =='
      }
    },
  },
}
</script>

<style scoped>
.status {
  display: inline-block;
  border: 1px solid #000;
  border-radius: 12px;
  padding: 3px 6px;
  font-size: 9px;
  cursor: default;
}
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
