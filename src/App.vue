<script setup lang="ts">
import { RouterView } from 'vue-router';
import { TheHeader, TheFooter } from '@/shared/ui';
</script>

<template>
  <TheHeader></TheHeader>
  <RouterView />
  <TheFooter></TheFooter>
</template>
