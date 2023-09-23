<template>
  <h1 class="text-xs-center">{{ title.h1 }}</h1>
  <p class="text-xs-center">
    <RouterLink to="">{{ title.p }}</RouterLink>
  </p>
</template>

<script setup lang="ts">
const title = {
  h1: 'h1',
  p: 'p',
};
</script>

<style scoped></style>
