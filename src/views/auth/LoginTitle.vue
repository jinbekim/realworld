<template>
  <h1 class="text-xs-center">{{ title.h1 }}</h1>
  <p class="text-xs-center">
    <router-link to="">{{ title.p }}</router-link>
  </p>
</template>

<script setup lang="ts">
const title = {
  h1: 'h1',
  p: 'p',
};
</script>

<style scoped></style>
