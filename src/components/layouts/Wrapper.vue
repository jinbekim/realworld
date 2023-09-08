<template>
  <real-component :tags="tags"></real-component>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import Loading from '@/views/Loading.vue';
import { useTags } from '../../composable/useTags';

const { tags } = useTags();
const realComponent = defineAsyncComponent({
  loader: () => import('@/components/layouts/TheAside.vue'),
  loadingComponent: Loading,
  errorComponent: Loading,
});
</script>

<style scoped></style>
