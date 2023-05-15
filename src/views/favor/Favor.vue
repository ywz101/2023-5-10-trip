<script setup>

</script>

<template>
  <div class="favor">
    <template v-for="(item, index) in 1000" :key="index">
      <div>favor数据: {{ item }}</div>
    </template>
  </div>
</template>

<style lang="less" scoped>
</style>
